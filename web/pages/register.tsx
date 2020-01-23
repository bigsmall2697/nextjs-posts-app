import { Layout } from '../components'
import { Formik, Form } from 'formik'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Container, Paper, Typography, Button } from '@material-ui/core'
import { registerSchema } from '../validation'
import { MyTextField } from '../components'
import { register } from '../utils'
import { registerRequestDocument } from '../types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: 30
    },
    form: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%'
    },
    input: {
      marginTop: 15
    },
    button: {
      marginTop: 25
    }
  })
)

const initialValues = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: ''
}

const formFields: any = [
  {
    name: 'name',
    type: 'input',
    label: 'Name'
  },
  {
    name: 'email',
    type: 'input',
    label: 'Email'
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password'
  },
  {
    name: 'passwordConfirmation',
    type: 'password',
    label: 'Password confirmation'
  }
]

const Register = () => {
  const classes = useStyles()

  const handleSubmit = async (values: registerRequestDocument, { setSubmitting, resetForm }: any) => {
    try {
      setSubmitting(true)

      await register(values)
    } catch (err) {
      console.log(err)
    } finally {
      setSubmitting(false)
      resetForm()
    }
  }

  return (
    <Layout>
      <Container maxWidth='md'>
        <Paper className={classes.paper}>
          <Typography variant='h5' component='h2'>
            Register
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >{({ values, isSubmitting, errors }) => (
            <Form className={classes.form}>
              {formFields.map(({ name, type, label }: any) => (
                <MyTextField
                  key={`input-field-${name}`}
                  className={classes.input}
                  name={name}
                  type={type}
                  label={label}
                  fullWidth
                  errors={errors}
                />
              ))}
              <Button
                className={classes.button}
                variant='contained'
                color='primary'
                type='submit'
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Form>
          )}</Formik>
        </Paper>
      </Container>
    </Layout>
  )
}

export default Register
