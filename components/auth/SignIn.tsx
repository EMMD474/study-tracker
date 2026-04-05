import Button from "@mui/material/Button"
import { signInWithGoogle } from "./actions"
 
export default function SignIn() {
  return (
    <form action={signInWithGoogle}>
      <Button
        type="submit"
        fullWidth
        className="group mt-2"
        sx={{
          bgcolor: '#c8a96e',
          color: '#0a0a0a',
          py: 1.5,
          borderRadius: '8px',
          textTransform: 'none',
          boxShadow: '0 0 40px -10px rgba(200,169,110,0.4)',
          fontWeight: 600,
          fontSize: '0.875rem',
          transition: 'all 300ms',
          '&:hover': {
            bgcolor: '#c8a96e',
            boxShadow: '0 0 60px -10px rgba(200,169,110,0.6)',
            transform: 'scale(1.01)',
          },
          '&:active': {
            transform: 'scale(0.99)',
          }
        }}
        startIcon={
          <svg style={{ width: 20, height: 20 }} viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
        }
        endIcon={
          <svg
            style={{ width: 16, height: 16, transition: 'transform 200ms' }}
            className="group-hover:translate-x-0.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        }
      >
        Sign in with Google
      </Button>
    </form>
  )
} 