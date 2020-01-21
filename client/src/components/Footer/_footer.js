import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2)
  },
  title: {
    margin: 0
  },
  img: {
    paddingRight: theme.spacing(2)
  },
  links: {
    color: theme.palette.text.primary,
    paddingTop: theme.spacing(2),
    '&:hover': {
      color: theme.palette.secondary.dark,
      textDecoration: 'underline'
    },
    textDecoration: 'none'
  }
}));

export default useStyles;