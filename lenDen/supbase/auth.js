import {supabase} from './client'

export class AuthService  {
 async SignUp({email,password,name}){
    async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {name},
      emailRedirectTo: 'http://localhost:5173/',
    },
  })
}


  if(error) throw error
  return data
 }
 async login({email,password}){
   const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }
 async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) return null
    return user
  }

  async logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

}

const authService = new AuthService()
export default authService