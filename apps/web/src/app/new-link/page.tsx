"use client";

import { Card, CardHeader, CardTitle } from "@peanut/ui/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@peanut/ui/components/ui/tabs";
import ClaimLink from "~/src/components/ClaimLink";
import CreateLink from "~/src/components/CreateLink";

const NewLinkPage = () => {
  return (
    <div className="p-4">
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="w-full bg-opacity-60">
          <TabsTrigger className="flex-grow" value="create">
            Create
          </TabsTrigger>
          <TabsTrigger className="flex-grow" value="claim">
            Claim
          </TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <div className="flex flex-row items-start gap-2 bg-white p-2 rounded-md border bg-opacity-60 shadow-md">
            <CreateLink />
            <Card className="flex flex-grow">
              <CardHeader>
                <CardTitle>History</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="claim">
          <ClaimLink />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NewLinkPage;
