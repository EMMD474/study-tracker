import Button from "@mui/material/Button"
import GoogleIcon from '@mui/icons-material/Google'
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
        startIcon={<GoogleIcon style={{ width: 20, height: 20 }} />}
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