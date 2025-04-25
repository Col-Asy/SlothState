import React, { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Save, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "@/utils/firebase/firebase";
import {
  updatePassword,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateProfile,
} from "firebase/auth";
import { getInitials } from "@/utils/img-initials";

const AccountSettings = () => {
  const { user, logout } = useAuth();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmationText, setConfirmationText] = useState("");
  const { toast } = useToast();
  const initials = getInitials(user?.displayName || user?.email || "User");
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  useEffect(() => {
    const fetchUsername = async () => {
      if (user?.uid) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUsername(userDocSnap.data().username);
        }
      }
    };

    fetchUsername();
  }, [user?.uid]); // Refetch when UID changes

  const displayUsername = username || user?.displayName || user?.email || "User";

  const handleSaveProfile = async () => {
    try {
      if (user) {
        // Update Firebase Auth profile
        await updateProfile(user, { displayName });

        // Update Firestore document if exists
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          await updateDoc(userDocRef, { displayName });
        }

        toast({
          title: "Profile updated",
          description: "Your profile information has been saved.",
        });
      }
    } catch (error) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        variant: "destructive",
      });
      return;
    }

    try {
      if (user && user.email) {
        // Reauthenticate user
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        await reauthenticateWithCredential(user, credential);

        // Update password
        await updatePassword(user, newPassword);

        toast({
          title: "Password updated",
          description: "Your password has been changed successfully.",
        });

        // Clear password fields
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      toast({
        title: "Password update failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleAccountDelete = async () => {
    if (confirmationText.toLowerCase() !== "delete my account") {
      toast({
        title: "Confirmation text incorrect",
        variant: "destructive",
      });
      return;
    }

    try {
      if (user) {
        let batch = writeBatch(db);
        const userId = user.uid;

        // 3. Delete integrations
        const integrationsRef = collection(db, "integrations");
        const integrationsQuery = query(
          integrationsRef,
          where("uid", "==", userId)
        );
        const integrationsSnap = await getDocs(integrationsQuery);
        integrationsSnap.forEach((doc) => batch.delete(doc.ref));

        // 4. Delete tracking data (paginated to handle large datasets)
        let trackingQuery = query(
          collection(db, "tracking"),
          where("userId", "==", userId),
          limit(500)
        );
        let trackingSnap = await getDocs(trackingQuery);

        while (!trackingSnap.empty) {
          trackingSnap.forEach((doc) => batch.delete(doc.ref));
          await batch.commit();

          // Start new batch for next page
          batch = writeBatch(db);
          trackingQuery = query(
            trackingQuery,
            startAfter(trackingSnap.docs[trackingSnap.docs.length - 1])
          );
          trackingSnap = await getDocs(trackingQuery);
        }

        // 1. Delete user document
        const userRef = doc(db, "users", userId);
        batch.delete(userRef);

        // 2. Delete username reference
        const userDoc = await getDoc(userRef);
        const username = userDoc.data()?.username;
        if (username) {
          const usernameRef = doc(db, "usernames", username);
          batch.delete(usernameRef);
        }

        // 5. Execute final batch commit
        await batch.commit();

        // 6. Delete auth user
        await deleteUser(user);

        logout();
        toast({
          title: "Account deleted",
          description: "All your data has been permanently removed.",
        });
      }
    } catch (error) {
      toast({
        title: "Deletion failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground">
            Manage your account details and preferences
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  {/* Only show initials */}
                  <AvatarFallback className="text-2xl font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="text-center mt-2 text-gray-400">@{username}</div>
              </div>

              <div className="space-y-4 flex-1">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSaveProfile}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Update your password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handlePasswordChange}>
              <Save className="h-4 w-4 mr-2" />
              Change Password
            </Button>
          </CardFooter>
        </Card>

        {/* Commented out notification settings
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Manage how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive updates, reports, and alerts via email</p>
              </div>
              <Switch 
                checked={isEmailNotifications} 
                onCheckedChange={handleNotificationChange} 
              />
            </div>
          </CardContent>
        </Card> */}

        <Card>
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription>Irreversible account actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-destructive">
                    Delete Account
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data.
                    This action cannot be undone.
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Delete Account
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. All your data will be permanently
              deleted.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 border rounded-md bg-muted/50">
            <p className="text-sm">
              Please type <strong>delete my account</strong> to confirm:
            </p>
            <Input
              className="mt-2"
              placeholder="delete my account"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleAccountDelete}
              disabled={confirmationText.toLowerCase() !== "delete my account"}
            >
              Permanently Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AccountSettings;
