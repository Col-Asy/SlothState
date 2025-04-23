import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Globe, Trash2, AlertCircle } from "lucide-react";
import { IntegrationSite } from "@/types/Integration";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/utils/firebase/firebase";
import {
  collection,
  query,
  where,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

const Integrations = () => {
  const { user } = useAuth();
  const [sites, setSites] = useState<IntegrationSite[]>([]);
  const [newSiteUrl, setNewSiteUrl] = useState("");
  const [isUrlValid, setIsUrlValid] = useState(false);

  // Fetch username from Firestore (assuming you store it in /users/{uid})
  const [username, setUsername] = useState<string>("");
  useEffect(() => {
    const fetchUsername = async () => {
      if (user?.uid) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUsername(userDocSnap.data().username || "");
        }
      }
    };
    fetchUsername();
  }, [user?.uid]);

  // Real-time listener for user's integrations
  useEffect(() => {
    if (!user?.uid) return;
    const q = query(
      collection(db, "integrations"),
      where("uid", "==", user.uid)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      const data: IntegrationSite[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as IntegrationSite);
      });
      setSites(data);
    });
    return () => unsub();
  }, [user?.uid]);

  // Real-time listener for user's integrations
  useEffect(() => {
    if (!user?.uid) return;
    const q = query(
      collection(db, "integrations"),
      where("uid", "==", user.uid)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      const data: IntegrationSite[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as IntegrationSite);
      });
      setSites(data);
    });
    return () => unsub();
  }, [user?.uid]);

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      setIsUrlValid(true);
      return true;
    } catch {
      setIsUrlValid(false);
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setNewSiteUrl(url);
    validateUrl(url);
  };

  const addSite = async () => {
    if (!validateUrl(newSiteUrl) || !user?.uid || !username) return;

    const urlObj = new URL(newSiteUrl);
    const favicon = `https://www.google.com/s2/favicons?domain=${urlObj.hostname}`;
    await addDoc(collection(db, "integrations"), {
      uid: user.uid,
      username,
      url: newSiteUrl,
      status: false, // Pending by default
      dateAdded: new Date().toISOString(),
      favicon,
    });

    setNewSiteUrl("");
    setIsUrlValid(false);
  };

  const removeSite = async (id: string) => {
    await deleteDoc(doc(db, "integrations", id));
  };

  const changeConnection = async (id: string, currentStatus: boolean) => {
    await updateDoc(doc(db, "integrations", id), {
      status: !currentStatus,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Integrations</h1>
          <p className="text-muted-foreground">
            Connect and manage websites for tracking user interactions
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add New Integration</CardTitle>
            <CardDescription>
              Enter the URL of the website you want to track
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <div className="flex-1">
                <Label htmlFor="site-url">Website URL</Label>
                <Input
                  id="site-url"
                  placeholder="https://yourwebsite.com"
                  value={newSiteUrl}
                  onChange={handleUrlChange}
                  className="mt-1"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={addSite} disabled={!isUrlValid}>
                  Add Site
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-xl font-semibold mb-4">Connected Sites</h2>

          <div className="grid gap-4 md:grid-cols-2">
            {sites.map((site) => (
              <Card key={site.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md border flex items-center justify-center overflow-hidden bg-background">
                      <img
                        src={site.favicon}
                        alt=""
                        className="h-4 w-4"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/16x16/gray/white?text=S";
                        }}
                      />
                    </div>
                    <CardTitle className="text-base flex-1 truncate">
                      {new URL(site.url).hostname}
                    </CardTitle>
                    {site.status ? (
                      <span className="flex items-center text-xs text-green-500 font-medium">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </span>
                    ) : (
                      <span className="flex items-center text-xs text-amber-500 font-medium">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Pending
                      </span>
                    )}
                  </div>
                  <CardDescription className="truncate">
                    {site.url}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-xs text-muted-foreground">
                    Added on {site.dateAdded}
                  </p>
                </CardContent>
                <CardFooter className="pt-0 flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => changeConnection(site.id, site.status)}
                  >
                    <Globe className="h-3.5 w-3.5 mr-1.5" /> Change Connection
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSite(site.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {sites.length === 0 && (
            <div className="text-center py-12 border rounded-lg bg-muted/20">
              <p className="text-muted-foreground">
                No sites connected yet. Add your first integration above.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Integrations;
