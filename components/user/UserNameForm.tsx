
import { User } from '@prisma/client'
import React, { FC } from 'react'

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, 'id' | 'username'> 
} 
const UserNameForm:FC<UserNameFormProps> = ( {user}) => {
  return (
    <div>UserNameForm: {user.username}</div>
  )
}

export default UserNameForm