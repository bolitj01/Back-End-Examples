import './App.css';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Auth from './Auth';
import Account from './Account';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get the current session on initial load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for authentication state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const user = session.user;

          // Upsert the user's profile into the profiles table
          const { error: upsertError } = await supabase.from('profiles').upsert({
            id: user.id, // Link the profile to the user's ID
            username: null, // Default value for username
            avatar_url: null, // Default value for avatar_url
          });

          if (upsertError) {
            console.error('Error upserting profile:', upsertError.message);
          } else {
            console.log('Profile upserted successfully.');
          }
        }

        // Update the session state
        setSession(session);
      }
    );

  }, []);

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
    </div>
  );
}

export default App;