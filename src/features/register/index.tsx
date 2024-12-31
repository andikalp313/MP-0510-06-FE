"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import RegisterOrganizerPage from "../register-admin";
import RegisterUserPage from "../register-user";

const registerPage = () => {
  const [activeTab, setActiveTab] = useState("User");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center">
        <h1 className="text-center text-3xl font-bold">
          Explore<span className="text-sky-600">TiK</span> Register Form
        </h1>
      </div>
      <Tabs
        className="justify-items-center"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <div className="flex items-center justify-between">
          <TabsList className="flex-row justify-center">
            <TabsTrigger value="User">User</TabsTrigger>
            <TabsTrigger value="EventOrganizer">Event Organizer</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="User">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">User form</CardTitle>
            </CardHeader>
            <CardContent>
              <RegisterUserPage />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="EventOrganizer">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Event Organizer form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RegisterOrganizerPage />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default registerPage;
