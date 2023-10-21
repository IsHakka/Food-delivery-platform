import NavBar from './components/NavBar';
import Menu from './components/Menu';
import Cart from './components/Cart';
import FoodsCategory from './components/FoodsCategory';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { fetchFoodList } from './store/modules/takeaway';
import { useEffect } from 'react';


const App = () => {
  // 獲得資料
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFoodList())
  }, [dispatch])
  // 列表
  const { foodsList } = useSelector(state => state.foods)

  return (
    <div className="home">
      {/* 導航 */}
      <NavBar />

      {/* 内容 */}
      <div className="content-wrap">
        <div className="content">
          <Menu />

          <div className="list-content">
            <div className="goods-list">
              {/* 外卖商品列表 */}
              {foodsList.map(item => {
                return (
                  <FoodsCategory
                    key={item.tag}
                    // 列表標題
                    name={item.name}
                    // 列表商品
                    foods={item.foods}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 購物車 */}
      <Cart />
    </div>
  )
}

export default App
