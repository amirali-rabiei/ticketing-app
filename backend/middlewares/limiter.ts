import rateLimit from "express-rate-limit";

export const isMeLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: 'Too many attempts, please try later',
    keyGenerator: (req) => req.body.email || req.ip,
    standardHeaders: true,
    legacyHeaders: false
})

export const RegisterUserLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: 'Too many attempts, please try later',
    keyGenerator: (req) => req.body.email || req.ip,
    standardHeaders: true,
    legacyHeaders: false,
})

export const LoginUserLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: 'Too many attempts, please try later',
    keyGenerator: (req) => req.body.email || req.ip,
    standardHeaders: true,
    legacyHeaders: false
})

export const sendVerificationCodeLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: 'Too many attempts, please try later',
    keyGenerator: (req) => req.body.email || req.ip,
    standardHeaders: true,
    legacyHeaders: false
})

export const sendResetPasswordLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: 'Too many attempts, please try later',
    keyGenerator: (req) => req.body.email || req.ip,
    standardHeaders: true,
    legacyHeaders: false
})

