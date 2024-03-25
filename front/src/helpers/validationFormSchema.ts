import * as Yup from 'yup';

export const authSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .min(5, 'Incorrect email')
    .max(50, 'Too long email!')
    .required('required'),
  password: Yup.string()
    .min(6, 'Password must contain at least 6 characters!')
    .max(50, 'Too long password!')
    .required('required'),
});

export const createOrUpdateArticleSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must contain at least 3 characters!')
    .max(200, 'Too long title!')
    .required('required'),
  link: Yup.string()
    .min(3, 'videoLink must contain at least 3 characters!')
    .max(300, 'videoLink must contain no more than 200 characters'),
  content: Yup.string()
    .min(3, 'Content must contain at least 3 characters!')
    .max(400, 'content must contain no more than 400 characters')
    .required('required'),
  videoLink: Yup.string()
    .min(3, 'videoLink must contain at least 3 characters!')
    .max(300, 'videoLink must contain no more than 200 characters'),
});