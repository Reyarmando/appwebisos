import Table from 'react-bootstrap/Table';

function Ventas() {


  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Id</th>
          <th>Cliente</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>...</td>
          <td>...</td>
          <td>@..</td>
          <td>...</td>
          <td>@..</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Ventas;