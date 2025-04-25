import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Home, Link2, User, Settings, LogOut, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { getInitials } from "@/utils/img-initials";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase/firebase";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const { user, logout } = useAuth();
  const [username, setUsername] = useState<string | null>(null);
  const displayName = user?.displayName || user?.email || "User";
  const displayEmail = user?.email || "No email";
  const initials = getInitials(user?.displayName || user?.email || "User");

  // Helper to highlight active route
  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    navigate("/signin"); // Redirect to signin page
    setIsUserDialogOpen(false);
  };

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

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r">
          <SidebarContent>
            {/* Logo Section */}
            <div className="px-3 py-4">
              <div className="flex items-center gap-2 px-2">
                <span className="font-bold text-xl">
                  SlothState<span className="text-blue-600">.</span>
                </span>
              </div>
            </div>

            {/* Main Navigation */}
            <SidebarGroup>
              <SidebarGroupLabel className="uppercase tracking-wide text-sm text-muted-foreground pb-1 border-b-2 mb-2">
                Analytics
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive("/dashboard")}
                      tooltip="Overview"
                      className={`text-lg`}
                    >
                      <Link to="/dashboard">
                        <Home className="h-4 w-4" />
                        <span>Overview</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive("/dashboard/integrations")}
                      tooltip="Integrations"
                      className="text-lg"
                    >
                      <Link to="/dashboard/integrations">
                        <Link2 className="h-4 w-4" />
                        <span>Integrations</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* User Section */}
            <div className="mt-auto">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => setIsUserDialogOpen(true)}
                        tooltip="User Account"
                        className="px-3 py-6 mb-2 rounded-lg bg-primary hover:bg-primary/80 border flex items-center gap-2 "
                      >
                        <Avatar className="h-8 w-8">
                          {/* Only show initials */}
                          <AvatarFallback className="text-xs font-bold">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        {username && <span className="text-sm">@{username}</span>}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              {/* Announcements Area */}
              {/* <div className="p-3 mt-4 mb-2">
                <div className="p-3 rounded-lg bg-muted/50 border flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    New features available!
                  </span>
                </div>
              </div> */}
            </div>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-col flex-1">
          <header className="h-14 border-b flex items-center px-6">
            <div className="flex-1">
              <SidebarTrigger />
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>

      {/* User Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>User Account</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-4 space-y-2">
            <Avatar className="h-16 w-16">
              {/* Only show initials */}
              <AvatarFallback className="text-2xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            {username && <h3 className="font-medium light:text-muted text-gray-500">@{username}</h3>}
            <h3 className="font-medium">{displayName}</h3>
            <p className="text-sm text-muted-foreground">{displayEmail}</p>
          </div>
          <div className="flex flex-col space-y-3">
            <Button variant="outline" className="justify-start" asChild>
              <Link to="/dashboard/account-settings">
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Link>
            </Button>
            <Button
              variant="destructive"
              className="justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default DashboardLayout;
