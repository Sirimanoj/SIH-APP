
'use client';

import React from 'react';
import { Heart, MessageSquare, Send, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';

const posts = [
  {
    id: 1,
    author: 'Anonymous Panda',
    content: 'Feeling really overwhelmed with exam pressure. Any tips on how to manage the stress without burning out?',
    likes: 12,
    replies: 4,
    category: 'Academic Stress',
  },
  {
    id: 2,
    author: 'Anonymous Giraffe',
    content: "I'm new to the campus and finding it hard to make friends. It feels pretty lonely sometimes. Anyone else felt this way?",
    likes: 28,
    replies: 9,
    category: 'Loneliness',
  },
  {
    id: 3,
    author: 'Anonymous Koala',
    content: 'Just wanted to share a small win! I finally finished a tough assignment I was procrastinating on for weeks. It feels so good!',
    likes: 45,
    replies: 15,
    category: 'Small Wins',
  },
];

export default function CommunityPage() {
  const t = useTranslations('Community');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-lg">{t('newPostTitle')}</CardTitle>
          <CardDescription>{t('newPostDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea placeholder={t('newPostPlaceholder')} />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>
            <Send className="mr-2 h-4 w-4" />
            {t('postButton')}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="space-y-6">
        <h2 className="font-headline text-2xl font-semibold">{t('recentDiscussions')}</h2>
        {posts.map((post) => (
          <Card key={post.id} className="w-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{post.author}</CardTitle>
                   <Badge variant="outline">{post.category}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{post.content}</p>
            </CardContent>
            <CardFooter className="flex items-center gap-4 text-sm text-muted-foreground">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{post.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{post.replies} {t('replies')}</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
