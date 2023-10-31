import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button,TextField } from '@mui/material';
import contactSchema, { ContactFormData } from './contactSchema';
import GoogleLoginBtn from './googleBtn';

function ContactForm() {
    const { handleSubmit, control, formState: { errors } } = useForm<ContactFormData>({
        resolver: yupResolver(contactSchema)
    });

    const onSubmit = (data: ContactFormData) => {
        console.log(data)
    };
    
    return (
            <Box
                component="form"
                sx={{ m: 3, width: '350px' ,display: 'flex',flexWrap: 'wrap', margin: '20px auto'}}
                noValidate
                autoComplete="off"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        control={control}
                        name="fullname"
                        render={({ field: { onChange } }) => (
                            <TextField
                                required
                                id="filled-required"
                                label="Full name"
                                variant="filled"
                                onChange={onChange}
                                sx={{minWidth: '350px', marginBottom: '10px'}}
                            />
                        )}
                    />
                    <div>{errors.fullname && (<p>{errors.fullname.message}</p>)}</div>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange } }) => (
                            <TextField
                                required
                                placeholder="Email"
                                label="Email"
                                type="email"
                                onChange={onChange}
                                variant="filled"
                                sx={{minWidth: '350px', marginBottom: '10px'}}
                            />
                        )}
                    />
                    <div>{errors.email && (<p>{errors.email.message}</p>)}</div>
                    <Controller
                        control={control}
                        name="question"
                        render={({ field: { onChange } }) => (
                            <TextField
                                required
                                id="outlined-multiline-static"
                                label="Question"
                                multiline
                                onChange={onChange}
                                rows={4}
                                sx={{minWidth: '350px', marginBottom: '10px'}}
                            />
                        )}
                    />
                    <div>{errors.question && (<p>{errors.question.message}</p>)}</div>
                </form>
                <Button variant="outlined" sx={{mr: '5px'}}>Submit</Button>
                <GoogleLoginBtn/>
            </Box>
        );
}

export default ContactForm;