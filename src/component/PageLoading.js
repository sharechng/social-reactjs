import React from 'react'
import { makeStyles, Box, LinearProgress } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 2000,
  },
}))

export default function PageLoading() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Box width={200} textAlign="center">
        <img src="/loader/logo_ww.gif" alt="Loading Page" width="200px" />
      </Box>
    </div>
  )
}
