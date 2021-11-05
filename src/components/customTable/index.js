import { Button, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';

const arrayDiff = (arrayA, arrayB) => {
  var result = [];
  for (var i = 0; i < arrayA.length; i++) {
    if (arrayB.indexOf(arrayA[i]) <= -1) {
      result.push(arrayA[i]);
    }
  }
  return result;
};

/**
 * 
 * @param {Object[]} props.data Accepts data for the table to display.
 * @param {Object} props.options options for the Table.
 * @param {Array} props.options.ignoreKeys send the keys you want to ignore.
 * @param {Objects[]} props.options.actions array to set actions per row basis.
 * @param {String} props.options.actions.name name of the action to be displayed in Table header.
 * @param {String} props.options.actions.label label for the action button header.
 * @param {Function} props.options.actions.function function to be performed by switch(onChange) and button(onClick) : params (event,rowData).
 * @param {Objects[]} props.options.toolbarActions array to set actions on selected items.
 * @param {String} props.options.toolbarActions.label Button Label.
 * @param {Function} props.options.toolbarActions.function function to be performed by toolbar button(onClick) : params (event,selectedItemData).
 * 
 * @example <CustomTable data={data} options={{
      toolbarActions: [{
        label: 'console selected items',
        function: (e, data) => {
         console.log(data);
        }
      }],
      actions: [
          {
            name: 'action button',
            label: 'console hello world on button click',
            type:'button'
            function: (e, data) => {
              console.log(data);
            }
          }
        ],
      ignoreKeys: ['id'],
    }} />
 */


const breakObject = (obj) => {
  if (obj === null || obj === undefined) return 'No Data';
  if (!Array.isArray(obj)) return null;
  if (obj[0] === undefined) return 'No Data';
  if (obj[0] === null) return 'No Data';

  return (obj.map((value, i) => {
    return (<>
      <Typography>
        {value}
      </Typography>
      {i < obj.length - 1 ? <br /> : null}
    </>);
  }));
};

const RenderRow = (props) => {
  return props.keys.map((key, index) => {
    return (<TableCell style={props.style} onClick={props.onClick} key={`cell${index}${Math.random()}`}>
      <Typography varient="body1">
        {Array.isArray(props.data[key]) ? breakObject(props.data[key]) : String(props.data[key])}
      </Typography>
    </TableCell>);
  });
};

RenderRow.propTypes = {
  keys: PropTypes.array.isRequired,
  data: PropTypes.any,
};

const Heading = (props) => {
  return (<TableCell><strong>{props.value}</strong></TableCell>);
};
Heading.propTypes = {
  value: PropTypes.any
};


const ActionButton = (props) => {
  return (<Button variant={"outlined"} onClick={(e) => props.function(e)} >
    {props.label ?? 'Button'}
  </ Button>
  );
};

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  function: PropTypes.func.isRequired
};

const CustomTable = (props) => {
  const useStyles = makeStyles(() => ({
    root: {
      width: '100%',
      marginTop: 0,
      overflowX: 'auto'
    },
    tableWrapper: {
      maxHeight: 600,
      overflowY: 'auto',
      '-webkit-overflow-scrolling': 'touch',
    },
    table: {
      minWidth: 650,
    },
    spacer: {
      flex: '1 1 100%',
    },
    title: {
      flex: '0 0 auto',
    },
    actions: {
      float: 'right'
    },
  }));
  const classes = useStyles();
  const [_keys, setKeys] = useState([]);

  useEffect(() => {
    const ignoreKeys = () => {
      if (props.data === undefined) return [];
      let _keys = Object.keys(props.data[0]);
      if (props.options !== undefined)
        if (props.options.ignoreKeys === undefined) {
          setKeys(_keys);
        } else setKeys(arrayDiff(_keys, props.options.ignoreKeys));
      else setKeys(_keys);
    };
    if (props.data !== undefined && props.data !== null)
      if (props.data.length > 0) {
        ignoreKeys();
      }
  }, [props.data, props.options]);


  const renderHeader = () => {
    return _keys.map((key) => {
      return <Heading key={key} value={key} />;
    });
  };


  const renderActions = useCallback((__obj) => {
    if (props.options === undefined) return null;
    if (props.options.actions !== undefined) {
      return props.options.actions.map(value => {
        return (<TableCell key={Math.random()}>
          <ActionButton key={Math.random()} label={value.label} function={(e) => value.function(e, __obj)} />
        </TableCell>
        );
      });
    }
  }, [props.options]);


  const getRowsData = useCallback((data) => {
    return data.map((row, index) => {
      return (
        <TableRow key={Math.random()}>
          <RenderRow style={props?.options?.onRowClick instanceof Function ? { cursor: 'pointer' } : undefined} onClick={(event) => {
            if (props.options.onRowClick instanceof Function) {
              props.options.onRowClick(event, row);
            }
          }} key={Math.random()} data={row} keys={_keys} />
          {renderActions(props.data[index])}
        </TableRow>);
    });
  }, [_keys, props.data, props.options, renderActions]);

  const renderActionHeaders = () => {
    return props.options.actions.map(value => {
      if (value === false) return null;
      return <Heading key={value.name} value={value.name} />;
    });
  };

  const renderError = () => {
    if (props.data.length === 0) {
      return (< TableRow >
        <TableCell colSpan={5} >
          <Grid container spacing={0}
            alignItems="center"
            justifyContent="center">
            <Grid item >
              <Typography>Sorry! No Data Present</Typography>
            </Grid>
          </Grid>
        </TableCell>
      </TableRow >);
    }
    else return null;
  };

  const createBar = () => {
    return (
      <Toolbar>
        <div className={classes.title}>
          <Typography variant="h6" id="tableTitle">
            {props.title !== undefined ? props.title : 'CustomTable'}
          </Typography>
        </div>
        <div className={classes.spacer} />
        {
          props.options && <Grid container spacing={1} direction="row" justifyContent="flex-end" alignItems="flex-end">
            {props.options.toolbarActions !== undefined ?
              props.options.toolbarActions.map((value, i) => {
                if (value === undefined) return null;
                return (<Grid item key={'toolbarAction' + i}>
                  <Button color="primary" size="small" onClick={(e) => value.function(e)} variant="contained">{value.label}</Button>
                </Grid>);
              })
              : null
            }
          </Grid>
        }
      </Toolbar >);
  };

  if (typeof props.data === 'object') {
    let content = (
      <Paper className={classes.root}>
        {createBar()}
        <div className={classes.tableWrapper}>
          <Table className={classes.table} >
            <TableHead>
              <TableRow >
                {renderHeader()}
                {props?.options?.actions && renderActionHeaders()}
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableBody}>
              {(props.data ? getRowsData(props.data) : null)}
              {renderError()}
            </TableBody>
          </Table>
        </div>
      </Paper>
    );
    return content;
  }

  return <div>INVALID DATA! DATA YOU ARE SENDING IS NOT AN ARRAY OF OBJECTS</div>;
};

CustomTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  options: PropTypes.shape({
    onRowClick: PropTypes.func,
    ignoreKeys: PropTypes.arrayOf(PropTypes.string),
    actions: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      function: PropTypes.func
    })),
    toolbarActions: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      function: PropTypes.func
    })),
  }),
  title: PropTypes.string.isRequired,
};

export default CustomTable;