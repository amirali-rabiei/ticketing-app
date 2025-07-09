import { fetchPopularTickets, fetchTicketById, solidTicketsByMonth } from './../controllers/TicketControllers/ticketController';
import { Router } from 'express';
import { LoginUser, RegisterUser, me, LogoutUser, VerificationCode } from '../controllers/authControllers/authController';
import { LoginUserLimiter, RegisterUserLimiter, isMeLimiter, sendResetPasswordLimiter, sendVerificationCodeLimiter } from '../middlewares/limiter';
import { fetchUsers, forgetPassword, resetPassword } from '../controllers/authControllers/userController';
import { authenticate, authorizeRole } from '../middlewares/authentication';
import { dashboard } from '../controllers/dashBoard/dashboardController';
import { addTicket, deleteAllTickets, fetchTickets, purchaseTicket } from '../controllers/TicketControllers/ticketController';

const useRouter: Router = Router()

// authController
useRouter.post('/RegisterUser', RegisterUserLimiter, RegisterUser)
useRouter.post('/LoginUser', LoginUserLimiter, LoginUser)
useRouter.post('/LogoutUser', LogoutUser)
useRouter.post('/api/me', me)
useRouter.post('/VerificationCode', sendVerificationCodeLimiter, VerificationCode)

// dashboardController
useRouter.get('/dashboard', authenticate, dashboard)

// userController
useRouter.post('/forgetPassword', authenticate, forgetPassword)
useRouter.post('/reset/:token', resetPassword)
useRouter.post('/fetchUsers', fetchUsers)

// tickeController
useRouter.post('/addTicket', addTicket)
useRouter.post('/fetchTicket/:category', fetchTickets)
useRouter.post('/purchase/:ticketId', authenticate, purchaseTicket)
useRouter.post('/deleteAllTickets', authenticate, deleteAllTickets)
useRouter.post('/fetchTicketById/:ticketId', fetchTicketById)
useRouter.get('/solidTicketsByMonth', solidTicketsByMonth)
useRouter.post('/fetchPopularTickets', fetchPopularTickets)

export default useRouter