import React, { useEffect, useState } from 'react';
import BreadList from '../ListPage/BreadList/BreadList';
import Filter from '../ListPage/Filter/Filter';
import './ListPage.scss';

function ListPage() {
  const [breadList, setBreadList] = useState([]);
  const [isOpenSortMenu, setisOpenSortMenu] = useState(false);
  const [sortPrice, setSortPrice] = useState('');
  function openProduct() {
    setisOpenSortMenu(!isOpenSortMenu);
  }

  function checkSortPrice(event) {
    setSortPrice(event.target.name);
  }

  function sort() {
    if (sortPrice === 'higher') {
      setBreadList(prev =>
        [...prev].sort((a, b) => parseInt(b.price) - parseInt(a.price))
      );
    } else {
      setBreadList(prev =>
        [...prev].sort((a, b) => parseInt(a.price) - parseInt(b.price))
      );
    }
  }

  function reset() {
    setSortPrice('');
    setBreadList(prev => [...prev].sort((a, b) => a.id - b.id));
  }
  useEffect(() => {
    fetch('http://10.58.0.72:8000/packages/list')
      .then(res => res.json())
      .then(json => {
        setBreadList(json.PACKAGES_LIST);
      });
  }, []);

  return (
    <div className="ListPage">
      <div>
        <span className="homeRoot">HOME</span>
        <span className="sign" />
        <span className="subscribeRoot"> 빵구독</span>
      </div>
      <ul className="breadContainer">
        <Filter
          openProduct={openProduct}
          checkSortPrice={checkSortPrice}
          sort={sort}
          reset={reset}
          isOpenSortMenu={isOpenSortMenu}
          sortPrice={sortPrice}
        />

        {breadList.map(bread => {
          return <BreadList key={bread.id} bread={bread} />;
        })}
      </ul>
    </div>
  );
}

export default ListPage;
