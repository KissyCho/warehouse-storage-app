import { Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';

import { HomeContainer } from './styles';
import Modal from '../../components/Modal';
import { ModalContext } from '../../context/ModalContext';
import { DataContext } from '../../context/DataContext';
import Button from '../../components/Button';
import Table from '../../components/Table';
import WelcomeMessage from '../../components/WelcomeMessage';

const Home = () => {
  const { state, toggleModal } = useContext(ModalContext);
  const { state: dataState, refetchProducts } = useContext(DataContext);
  const { isModalVisible } = state;
  const { products } = dataState;

  useEffect(() => {
    refetchProducts();
  }, [isModalVisible]);

  return (
    <HomeContainer>
      <WelcomeMessage />
      {isModalVisible && <Modal />}
      <Button
        type="button"
        classNames="mb-5"
        btnType="primary"
        onClick={() => toggleModal()}
      >
        Add Product
      </Button>
      <Button type="button" classNames="mb-5 ms-2" btnType="info">
        <Link to="/warehouses">Manage Warehouses</Link>
      </Button>
      <Table 
        items={products} 
        headers={
            [
                'Name', 
                'Size Per Unit', 
                'Quantity',
                'Hazardous'
            ]
        }
        type="products"
    />
    </HomeContainer>
  );
};

export default Home;
