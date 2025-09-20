import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Globe } from 'lucide-react';

const resources = [
  {
    name: 'iCALL Psychosocial Helpline',
    number: '022-25521111',
    website: 'https://icallhelpline.org/',
    description: 'A national helpline providing free and confidential counseling by trained professionals. Available from Monday to Saturday, 10 AM to 8 PM.',
  },
  {
    name: 'Vandrevala Foundation',
    number: '9999666555',
    website: 'https://www.vandrevalafoundation.com/',
    description: '24/7 helpline for anyone in distress, providing support for mental health and emotional well-being in multiple Indian languages.',
  },
  {
    name: 'KIRAN Mental Health Helpline',
    number: '1800-599-0019',
    website: 'https://www.google.com/search?q=KIRAN+Mental+Health+Helpline',
    description: 'A 24/7 toll-free helpline by the Government of India for providing support to people with mental health concerns.',
  },
  {
    name: 'Mitram Foundation',
    number: '080-25722573',
    website: 'https://www.mitramfoundation.org/',
    description: 'A suicide prevention helpline that offers emotional support to those who are in distress, depressed, or suicidal. Available all days 10 AM to 4 PM.',
  },
];

export default function EmergencyResourcesPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {resources.map((resource) => (
        <Card key={resource.name}>
          <CardHeader>
            <CardTitle className="font-headline text-xl">{resource.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{resource.description}</p>
            <div className="flex flex-col sm:flex-row gap-2">
              {resource.number && (
                <Button asChild className="flex-1">
                  <a href={`tel:${resource.number}`}>
                    <Phone className="mr-2 h-4 w-4" /> Call {resource.number}
                  </a>
                </Button>
              )}
              <Button asChild variant="outline" className="flex-1">
                <a href={resource.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-4 w-4" /> Visit Website
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
