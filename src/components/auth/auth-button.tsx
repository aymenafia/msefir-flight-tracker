
'use client';

import { useAuth, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { initiateGoogleSignIn, initiateSignOut } from '@/firebase/auth-mutations';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogIn, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function AuthButton() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  const handleSignIn = () => {
    initiateGoogleSignIn(auth);
  };

  const handleSignOut = () => {
    initiateSignOut(auth);
  };

  if (isUserLoading) {
    return <Button variant="outline" size="sm" disabled>Loading...</Button>;
  }

  if (!user || user.isAnonymous) {
    return (
      <Button variant="outline" size="sm" onClick={handleSignIn}>
        <LogIn className="mr-2 h-4 w-4" />
        Sign In
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
            <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
