import React, { Component } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableSortLabel from '@mui/material/TableSortLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import moment from 'moment';


import './IntakeHistorys.scss'


const headCells= [
  {
    id: 'intakeTime',
    numeric: false,
    disablePadding: true,
    label: 'Time',
  },
  {
    id: 'foodLabel',
    numeric: false,
    disablePadding: false,
    label: 'Food',
  },
  {
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'Calories',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Protein',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Fat',
  },
];


function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler =(property) => (event) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


export default class EnhancedTable extends Component {

    constructor(props) {
        super(props)

        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            page: 0,
            rowsPerPage: 6,
            rows: []
        }
        
        this.getIntakeHistory = this.getIntakeHistory.bind(this)
        this.handleRequestSort = this.handleRequestSort.bind(this)
        this.handleSelectAllClick = this.handleSelectAllClick.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleChangePage = this.handleChangePage.bind(this)
        this.isSelected = this.isSelected.bind(this)
        this.EnhancedTableToolbar = this.EnhancedTableToolbar.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }
  
  
  EnhancedTableToolbar = (props) => {
      const { numSelected } = props;
    
      return (
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
              bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
          }}
        >
          {numSelected > 0 ? (
            <Typography
              sx={{ flex: '1 1 100%' }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} selected
            </Typography>
          ) : (
            <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Daily Nutrition
            </Typography>
          )}
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton onClick={this.handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (<></>
            // <Tooltip title="Filter list">
            //   <IconButton>
            //     <FilterListIcon />
            //   </IconButton>
            // </Tooltip>
          )}
        </Toolbar>
      );
    };

  handleRequestSort = (event, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';
    this.setState({order: isAsc ? 'desc' : 'asc'});
    this.setState({orderBy: property});
  };

  handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = this.state.rows.map((n) => n.name);
      this.setState({selected: newSelecteds});
      return;
    }
    this.setState({selected: []});
  };

  handleDelete = () => {
    if (this.state.selected === []) return
    const apiUrl = 'http://localhost:5000/intake'
    const data = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
      },
      body: JSON.stringify({entryIds: this.state.selected})
    }
    fetch(apiUrl, data).then(res => res.json()).then(() => {
      this.getIntakeHistory()
    })
  }

  handleClick = (event, name) => {
    const selectedIndex = this.state.selected.indexOf(name);
    let newSelected= [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(this.state.selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(this.state.selected.slice(1));
    } else if (selectedIndex === this.state.selected.length - 1) {
      newSelected = newSelected.concat(this.state.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        this.state.selected.slice(0, selectedIndex),
        this.state.selected.slice(selectedIndex + 1),
      );
    }

    this.setState({selected: newSelected});
  };

  handleChangePage = (event, newPage) => {
      this.setState({page: newPage})
  };

  isSelected = (name) => this.state.selected.indexOf(name) !== -1;


  getIntakeHistory() {
    const apiUrl = 'http://localhost:5000/intake'
    const data = {
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
      }
    }
    fetch(apiUrl, data).then(res => res.json()).then(
      intakeLogs => {
        var updatedRows = []
        for (var num in intakeLogs) {
          var intake = intakeLogs[num]
          var curr = new Date()
          var takenTime = new Date(intake['intakeTime'])
          var intakeTime = ((curr.getDate() - takenTime.getDate()) < 1) ? moment(takenTime).format('h:mma') : moment(takenTime).format('h:mma, Do MMM') 
          var foodLabel = intake['foodLabel']
          var amount = intake['measure']
          var calories = Math.round((parseFloat(intake['totalNutrients']['ENERC_KCAL']['quantity']['$numberDecimal'])*10)/10)
          var protein = Math.round((parseFloat(intake['totalNutrients']['PROCNT']['quantity']['$numberDecimal'])*10)/10)
          var fat = Math.round((parseFloat(intake['totalNutrients']['FAT']['quantity']['$numberDecimal'])*10)/10)
          var entryId = intake['id']
          updatedRows.push({intakeTime, foodLabel, amount, calories, protein, fat, entryId})
        }
        this.setState({rows: updatedRows})
      }
    )  
  }

  componentDidMount() {
    this.getIntakeHistory()
  }


  render() {
      return (
    <div className='historyTable'>
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <this.EnhancedTableToolbar numSelected={this.state.selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={this.state.selected.length}
              order={this.state.order}
              orderBy={this.state.orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={this.state.rows.length}
            />
            <TableBody>
              {this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = this.isSelected(row.entryId);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => this.handleClick(event, row.entryId)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.entryId}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.intakeTime}
                      </TableCell>
                      <TableCell align="center">{row.foodLabel}</TableCell>
                      <TableCell align="center">{row.amount}</TableCell>
                      <TableCell align="center">{row.calories}</TableCell>
                      <TableCell align="center">{row.protein}</TableCell>
                      <TableCell align="center">{row.fat}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={this.state.rows.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
    </div>
      )
    }
}



