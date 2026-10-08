import { RouterProvider } from 'react-router-dom';
import { router } from './app.routes';
import AuthProvider from './features/auth/auth.context';
import { CareerProvider } from './context/career.context';
import { InterviewProvider } from './features/interview/interview.context';
import ThemeProvider from './context/theme.context';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CareerProvider>
          <InterviewProvider>
            <RouterProvider router={router} />
          </InterviewProvider>
        </CareerProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;