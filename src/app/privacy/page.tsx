import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lock } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Alert className="bg-primary/20 border-primary/30">
        <Lock className="h-4 w-4 text-primary" />
        <AlertTitle className="font-headline text-primary">Your Privacy is Our Priority</AlertTitle>
        <AlertDescription className="text-primary/80">
          We are committed to protecting your confidentiality. You are in control of your data.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Profile &amp; Privacy Settings</CardTitle>
          <CardDescription>Manage your account and data settings here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
            <Label htmlFor="anonymous-mode" className="flex flex-col space-y-1">
              <span>Anonymous Profile</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Your profile is always anonymous. We never ask for your real name.
              </span>
            </Label>
            <Switch id="anonymous-mode" checked disabled />
          </div>

          <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
            <Label htmlFor="e2e-encryption" className="flex flex-col space-y-1">
              <span>End-to-End Encryption</span>
              <span className="font-normal leading-snug text-muted-foreground">
                All your conversations are encrypted. Not even we can read them.
              </span>
            </Label>
            <Switch id="e2e-encryption" checked disabled />
          </div>

          <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
            <Label htmlFor="data-retention" className="flex flex-col space-y-1">
              <span>Auto-delete Conversations</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Automatically delete your chat history after 30 days.
              </span>
            </Label>
            <Switch id="data-retention" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Manage Your Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">Export My Data</Button>
          <Button variant="destructive" className="w-full">Delete My Account and All Data</Button>
        </CardContent>
      </Card>
    </div>
  );
}
