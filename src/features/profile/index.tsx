"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthGuard from "@/hoc/authGuard";
import { useState } from "react";
import ChangePasswordForm from "./component/updatePassword";
import { ProfileForm } from "./component/updateUser";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg-login2.png')" }}
    >
      <div className="mx-auto max-w-4xl space-y-6 rounded-lg bg-white/70 p-6">
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
            <TabsList className="flex-row justify-center gap-5">
              <TabsTrigger value="profile">profile</TabsTrigger>
              <TabsTrigger value="password">password</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="profile">
            <ProfileForm />
          </TabsContent>
          <TabsContent value="password">
            <ChangePasswordForm token="your-token-value" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthGuard(UserProfile);
