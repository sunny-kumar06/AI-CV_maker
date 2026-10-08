import { RouterProvider } from 'react-router-dom';
import { router } from './app.routes';
import AuthProvider from './features/auth/auth.context';
import { InterviewProvider } from './features/interview/interview.context';
import ThemeProvider from './context/theme.context';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <InterviewProvider>
          <RouterProvider router={router} />
        </InterviewProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;