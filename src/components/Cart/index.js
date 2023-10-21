import classNames from 'classnames'
import Count from '../Count'
import './index.scss'
import { useSelector, useDispatch } from 'react-redux'
import { addCounter, subCounter, clearCart } from '../../store/modules/takeaway'
import { useState } from 'react'
import { flatMap } from 'lodash'

const Cart = () => {
  const { cartList } = useSelector(state => state.foods)
  // 總金額
  const totalPrice = cartList.reduce((a, b) => a + b.price * b.count, 0)
  const dispatch = useDispatch()
  // 控制購物車打開
  const [visible, setVisible] = useState(false);
  const onShow = ()=>{
    if(cartList.length > 0){
      setVisible(true);
    }
  }
  return (
    <div className="cartContainer">
      {/* 遮罩層 添加visible類名可以顯示出来 */}
      <div
        className={classNames('cartOverlay', visible && 'visible')}
        onClick={() => setVisible(false)}
      />
      <div className="cart">
        {/* fill 添加fill類名可以切換購物車狀態*/}
        {/* 購物車数量 */}
        <div onClick={onShow()} className={classNames('icon', cartList.length > 0 && 'fill')}>
          {cartList.length > 0 && <div className="cartCornerMark">{cartList.length}</div>}
        </div>
        {/* 購物車價格 */}
        <div className="main">
          <div className="price">
            <span className="payableAmount">
              <span className="payableAmountUnit">$</span>
              {totalPrice}
            </span>
          </div>
          <span className="text">预估另需配送費 $15</span>
        </div>
        {/* 结算 or 外送費 */}
        {cartList.length > 0 ? (
          <div className="goToPreview">去結算</div>
        ) : (
          <div className="minFee">$20外送費</div>
        )}
      </div>
      {/* 添加visible類名 div會顯示出来 */}
      <div className={classNames('cartPanel', visible && 'visible')}>
        <div className="header">
          <span className="text">購物車</span>
          <span className="clearCart" onClick={() => dispatch(clearCart())}>
            清空購物車
          </span>
        </div>

        {/* 購物車列表 */}
        <div className="scrollArea">
          {cartList.map(item => {
            return (
              <div className="cartItem" key={item.id}>
                <img className="shopPic" src={item.picture} alt="" />
                <div className="main">
                  <div className="skuInfo">
                    <div className="name">{item.name}</div>
                  </div>
                  <div className="payableAmount">
                    <span className="yuan">¥</span>
                    <span className="price">{item.price}</span>
                  </div>
                </div>
                <div className="skuBtnWrapper btnGroup">
                  <Count
                    count={item.count} onPlus={() => dispatch(addCounter({ id: item.id }))} onMinus={() => dispatch(subCounter({ id: item.id }))}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Cart
