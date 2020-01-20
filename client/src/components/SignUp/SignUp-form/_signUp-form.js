import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rightTitle: {
    fontStyle: 'italic',
  },
  radioGender: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  radioLabel: {
    color: theme.palette.secondary.dark,
  },
  root: {
    '& .MuiRadio-colorSecondary.Mui-checked': {
      color: theme.palette.primary.main
    },
    '&.MuiFormControlLabel-root': {
      textAlign: 'justify'
    },
    '& .MuiCheckbox-colorSecondary.Mui-checked': {
      color: theme.palette.primary.main
    }
  },
  labelText: {
    color: theme.palette.secondary.dark,
  },
  labelBirthday: {
    margin: theme.spacing(3, 0, 2, 0),
    fontStyle: 'italic'
  },
  infoIcon: {
    marginLeft: '10px',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.dark
    }
  },
  modalInfoIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      width: 350
    },
    [theme.breakpoints.up('lg')]: {
      width: 450
    }
  },
  paperInfoIcon: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 0, 1),
  },
  modalInfoTitle: {
    position: 'relative',
    margin: 0,
    padding: theme.spacing(2, 3),
    backgroundColor: '#dad7ce',
    fontSize: 20,
    fontWeight: 'normal'
  },
  modalInfoClose: {
    position: 'absolute',
    right: 15,
    fontSize: '1.8rem',
    opacity: '0.8',
    cursor: 'pointer'
  },
  modalInfoText: {
    padding: theme.spacing(2, 3),
    textAlign: 'justify'
  },
  inputBirthDay: {
    width: '50%',
    textAlign: 'center',

    '&:not(:last-child)': {
      width: '25%',
      paddingRight: '15px',
    }
  },
  helperBirth: {
    display: 'block',
    margin: 0,
    textAlign: 'center',
    color: theme.palette.primary.dark
  }
}));

export default useStyles;
