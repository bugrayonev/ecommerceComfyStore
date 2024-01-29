import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components'

/* NOTE: 
Bu sayfayı hazırlamasak (error,loading durumu )

user login oldugu halde hala login sayfasında kalıyor .
"AuthWrapper" ile app icindeki butun elemanları saracagız 
*/


function AuthWrapper({children}) {
  const {isLoading,error} = useAuth0()
  if(isLoading){
    return <Wrapper><h1>
      Loading...</h1></Wrapper>
  }


  if(error){
    return <Wrapper><h1>{error.message}</h1></Wrapper>
  }
  return <>{children}</>;
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`

export default AuthWrapper
