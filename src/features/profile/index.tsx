"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthGuard from "@/hoc/authGuard";
import { useState } from "react";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center">
        <h1 className="text-center text-3xl font-bold">
          Explore<span className="text-sky-600">TiK</span> Setting
        </h1>
      </div>
      <Tabs
        className="justify-items-center"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <div className="flex items-center justify-between">
          <TabsList className="flex-row justify-center">
            <TabsTrigger value="profile">profile</TabsTrigger>
            <TabsTrigger value="password">password</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="profile">
              {/* <UserProfilePage />  */}
        </TabsContent>
        <TabsContent value="password">
              {/* <UpdatePasswordForm />    */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthGuard (UserProfile);
