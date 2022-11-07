import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../store/utils/thunks';
import { showToast } from '../utils/tools';


const Contact = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: { email:'', firstName:'', lastName:'', message:''},
        validationSchema: Yup.object({
            email: Yup.string()
            .required('Sorry, the email is required')
            .email('Sorry, the email is invalid'),
            firstName: Yup.string()
            .required('Sorry, the name is required'),
            lastName: Yup.string()
            .required('Sorry, the last name is required'),
            message: Yup.string()
            .required('Sorry, the message is required')
            .max(500, 'Sorry, the message is too long')

        }),
        onSubmit: (values, {resetForm}) => {
            dispatch(sendMessage(values))
            .unwrap()
            .then((response) => {
                if(response){
                    resetForm();
                    showToast('SUCCESS', 'Thank you, we will contact you back')
                } 
            })
            .catch(err => {
                showToast('ERROR', 'Sorry, try again later')
            })
            
        }
    })
    return(
        <>
            <h1>Contact us</h1>
            <form className='mt-3' onSubmit={formik.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>E-mail address</label>
                    <input
                    type='email'
                    className='form-control'
                    name='email'
                    placeholder='example@gmail.com' 
                    {...formik.getFieldProps('email')}
                    />
                    { formik.errors.email && formik.touched.email ?
                        <Alert variant='danger'>
                            {formik.errors.email}
                        </Alert>
                    :null}
                </div>
                <div className='form-group mt-2'>
                    <label htmlFor='firstName'>First name</label>
                    <input
                    type='text'
                    className='form-control'
                    name='firstName'
                    placeholder='Enter your name' 
                    {...formik.getFieldProps('firstName')}
                    />
                    { formik.errors.firstName && formik.touched.firstName ?
                        <Alert variant='danger'>
                            {formik.errors.firstName}
                        </Alert>
                    :null}
                </div>
                <div className='form-group'>
                    <label htmlFor='lastName'>Last name</label>
                    <input
                    type='text'
                    className='form-control'
                    name='email'
                    placeholder='Enter your last name' 
                    {...formik.getFieldProps('lastName')}
                    />
                    { formik.errors.lastName && formik.touched.lastName ?
                        <Alert variant='danger'>
                            {formik.errors.lastName}
                        </Alert>
                    :null}
                </div>
                <div className='form-group'>
                    <label htmlFor='message'>Message</label>

                     <textarea 
                     className='form-control'
                     name='message'
                     rows={3}
                     {...formik.getFieldProps('message')}
                     />
                    
                    { formik.errors.message && formik.touched.message ?
                        <Alert variant='danger'>
                            {formik.errors.message}
                        </Alert>
                    :null}
                </div>
                <button type='submit' className='btn btn-primary mt-2'>
                    Send message
                </button>
            </form>
        </>
    )
}

export default Contact;