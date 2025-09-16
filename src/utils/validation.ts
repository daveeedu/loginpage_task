import * as yup from 'yup';


export const loginSchema = yup.object().shape({
    username: yup.string().required('Username is required').oneOf(["emilys"], "Username must be 'emilys'"),
    email: yup.string().email('Invalid email format').notRequired().nullable(),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    rememberMe: yup.boolean().optional()
});

export type LoginFormData = yup.InferType<typeof loginSchema>;