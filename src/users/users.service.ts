import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user-dto'
import { UpdateUserDto } from './dto/update-user-dto'

@Injectable()
export class UsersService {
    private users = [{
        id: 1,
        email: 'noneEmail1@gmail.com',
        name: 'John Doe',
        role: 'ADMIN',
    }, {
        id: 2,
        email: 'noneEmail2@gmail.com',
        name: 'Jane Doe',
        role: 'INTERN',
    }, {
        id: 3,
        email: 'noneEmail3@gmail.com',
        name: 'Jim Doe',
        role: 'SUPER_ADMIN',
    }];

    findAll(role?: 'INTERN' | 'ADMIN' | 'SUPER_ADMIN') {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role)
            if (rolesArray.length === 0)
                throw new NotFoundException("User Role Not Found!")
            return rolesArray
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        if (!user) throw new NotFoundException("User not found!")
        return user
    }

    create(user: CreateUserDto) {
        const userByHighestId = [...this.users].sort((a, b) => b.id - a.id)
        const newUser = {
            id: userByHighestId[0].id + 1,
            ...user,
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, userUpdate: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...userUpdate }
            }
            return user
        })
        return this.findOne(id)
    }

    delete(id: number) {
        // const userIndex = this.user.findIndex(user => user.id === id)
        // const user = this.users[userIndex]
        // this.users.splice(userIndex, 1)
        const removeUser = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id)
        return removeUser
    }
}