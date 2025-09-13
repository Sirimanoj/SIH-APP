import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const articles = [
  {
    title: 'Managing Exam Stress',
    category: 'Stress',
    type: 'Article',
    image: PlaceHolderImages.find(img => img.id === 'resource-2'),
  },
  {
    title: 'Understanding Anxiety',
    category: 'Anxiety',
    type: 'Article',
    image: PlaceHolderImages.find(img => img.id === 'resource-5'),
  },
  {
    title: 'Building Healthy Friendships',
    category: 'Relationships',
    type: 'Article',
    image: PlaceHolderImages.find(img => img.id === 'resource-6'),
  },
];

const videos = [
  {
    title: '5-Minute Guided Meditation',
    category: 'Mindfulness',
    type: 'Video',
    image: PlaceHolderImages.find(img => img.id === 'resource-1'),
  },
  {
    title: 'Coping with Academic Pressure',
    category: 'Stress',
    type: 'Video',
    image: PlaceHolderImages.find(img => img.id === 'resource-4'),
  },
];

const audio = [
  {
    title: 'Relaxing Sleep Music',
    category: 'Sleep',
    type: 'Audio',
    image: PlaceHolderImages.find(img => img.id === 'resource-3'),
  },
];

const allResources = { articles, videos, audio };
type ResourceCategory = keyof typeof allResources;

function ResourceCard({ resource }: { resource: any }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        {resource.image && (
          <Image
            src={resource.image.imageUrl}
            alt={resource.image.description}
            width={600}
            height={400}
            className="aspect-video w-full object-cover"
            data-ai-hint={resource.image.imageHint}
          />
        )}
      </CardHeader>
      <CardContent className="p-4">
        <Badge variant="secondary" className="mb-2">{resource.category}</Badge>
        <CardTitle className="font-headline text-lg">{resource.title}</CardTitle>
      </CardContent>
    </Card>
  );
}

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Resource Library</h1>
        <p className="text-muted-foreground">
          Explore curated articles, videos, and audio guides for your mental well-being.
        </p>
      </div>

      <Tabs defaultValue="articles" className="w-full">
        <TabsList>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
        </TabsList>
        {(Object.keys(allResources) as ResourceCategory[]).map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allResources[category].map((resource) => (
                <ResourceCard key={resource.title} resource={resource} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
