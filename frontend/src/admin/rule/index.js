import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getUserInfoAdmin } from '../../actions/userActions';
import DashboardScreen from '../dashboard';
import { getConfig, updateConfig } from '../../actions/configAction';
import { Tooltip, Spin } from 'antd';
import { BsPlusSquare } from 'react-icons/bs';
import { GoDiffRemoved } from 'react-icons/go';
import { getProvince } from '../../actions/addressActions';
import utils from '../../modules/utils';
import _ from 'lodash';
const RuleAdminScreen = (props) => {
  const [rowColor, setColor] = useState([]);
  const [rowSize, setSize] = useState([]);
  const [rowBrand, setBrand] = useState([]);
  const [rowShipping, setShipping] = useState([]);

  const getUserAdmin = useSelector((state) => state.getUserAdmin);
  const { users, loading = false, error } = getUserAdmin;

  const { provinces, loading: loadingProvince = false } = useSelector(
    (state) => state.address
  );

  const { configs, updatingIndex, updatingLoading = false } = useSelector(
    (state) => state.config
  );

  const colorIndex =
    configs &&
    configs.length &&
    configs.findIndex((item) => item.key === 'color');
  const colors =
    configs && configs.length && configs[colorIndex]
      ? configs[colorIndex].value
      : [];
  const brandIndex =
    configs &&
    configs.length &&
    configs.findIndex((item) => item.key === 'brand');
  const brands =
    configs && configs.length && configs[brandIndex]
      ? configs[brandIndex].value
      : [];
  const sizeIndex =
    configs &&
    configs.length &&
    configs.findIndex((item) => item.key === 'size');
  const sizes =
    configs && configs.length && configs[sizeIndex]
      ? configs[sizeIndex].value
      : [];
  const shippingFeeIndex =
    configs &&
    configs.length &&
    configs.findIndex((item) => item.key === 'shipping_fee');
  const shippingFees =
    configs && configs.length && configs[shippingFeeIndex]
      ? configs[shippingFeeIndex].value
      : [];
  const fees = shippingFees && !_.isEmpty(shippingFees) ? shippingFees.fee : {};
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfoAdmin());
    dispatch(getConfig());
    dispatch(getProvince());
    return () => {};
  }, []);

  const onAdd = (key) => {
    switch (key) {
      case 'color':
        setColor([...rowColor, { color: '#000000', text: '' }]);
        break;
      case 'brand':
        setBrand([...rowBrand, '']);
        break;
      case 'size':
        setSize([...rowSize, '']);
        break;
      case 'shipping_fee':
        setShipping([...rowShipping, { province: '', price: '' }]);
        break;

      default:
        break;
    }
  };
  const onRemove = (key, index) => {
    switch (key) {
      case 'color':
        rowColor.splice(index, 1);
        setColor([...rowColor]);
        break;
      case 'brand':
        rowBrand.splice(index, 1);
        setBrand([...rowBrand]);
        break;
      case 'size':
        rowSize.splice(index, 1);
        setSize([...rowSize]);
        break;
      case 'shipping_fee':
        rowShipping.splice(index, 1);
        setShipping([...rowShipping]);
        break;

      default:
        break;
    }
  };
  const onChange = (type, index, key, value) => {
    switch (type) {
      case 'color':
        rowColor[index][key] = value;
        setColor([...rowColor]);
        break;
      case 'brand':
        rowBrand[index] = value;
        setBrand([...rowBrand]);
        break;
      case 'size':
        rowSize[index] = value;
        setSize([...rowSize]);
        break;
      case 'shipping_fee':
        rowShipping[index][key] = value;
        setShipping([...rowShipping]);
        break;

      default:
        break;
    }
  };

  const toObject = (arr, key, value, type) => {
    var rv = {};
    if (type === 'shipping_fee') {
      for (let i = 0; i < arr.length; ++i) rv[arr[i][key]] = parseInt(arr[i][value]);
    } else {
      for (let i = 0; i < arr.length; ++i) rv[arr[i][key]] = arr[i][value];
    }
    return rv;
  };

  const submitHandler = async (e, key) => {
    e.preventDefault();

    let object = '';
    let value = null;
    switch (key) {
      case 'color':
        object = configs[colorIndex];
        break;
      case 'brand':
        object = configs[brandIndex];
        break;

      case 'size':
        object = configs[sizeIndex];
        break;

      case 'shipping_fee':
        object = configs[shippingFeeIndex];
        break;

      default:
        break;
    }
    switch (key) {
      case 'color':
        value = { ...colors, ...toObject(rowColor, 'color', 'text', 'color') };
        break;
      case 'brand':
        value = [...brands, ...rowBrand];
        break;

      case 'size':
        value = [...sizes, ...rowSize.map(i => parseInt(i))];
        break;

      case 'shipping_fee':
        value = {
          ...shippingFees,
          fee: {
            ...shippingFees.fee,
            ...toObject(rowShipping, 'province', 'price', 'shipping_fee'),
          },
        };
        break;

      default:
        break;
    }
    await dispatch(
      updateConfig({
        id: object ? object._id : '',
        key: object ? object.key : '',
        name: object ? object.name : '',
        value: value ? value : null,
      })
    );
    switch (key) {
      case 'color':
        setColor([]);
        break;
      case 'brand':
        setBrand([]);
        break;

      case 'size':
        setSize([]);
        break;

      case 'shipping_fee':
        setShipping([]);
        break;

      default:
        break;
    }
    await dispatch(getConfig());
  };
  return (
    <DashboardScreen>
      <div className='maine'>
        <h3>Quy định</h3>
      </div>
      <Spin spinning={loading}>
        <Spin spinning={updatingIndex === 'color' ? updatingLoading : false}>
          <hr></hr>
          <form
            className='form-create-product'
            onSubmit={(e) => submitHandler(e, 'color')}
          >
            <div className='form-container'>
              <div
                className='container'
                style={{ height: 'min-content' }}
                key={'color'}
              >
                <div className='row'>
                  <div className='col-sm-3'>Màu sắc</div>
                  <div className='col-sm-9'>
                    <div className='row'>
                      {colors &&
                        Object.entries(colors).map((item) => (
                          <Tooltip title={item[1]}>
                            <span
                              className={`color-circle`}
                              style={{
                                margin: '5px',
                                backgroundColor: item[0],
                                textAlign: 'center',
                              }}
                              key={item[0]}
                            ></span>
                          </Tooltip>
                        ))}
                    </div>

                    <div className='row'>
                      <Tooltip title='Thêm mới'>
                        <BsPlusSquare
                          style={{ fontSize: '20px', cursor: 'pointer' }}
                          onClick={() => onAdd('color')}
                        />
                      </Tooltip>
                    </div>
                    {rowColor.map((i, index) => (
                      <div className='row' style={{ marginTop: '20px' }}>
                        <div className='col-sm-2'>
                          <input
                            className='form-control'
                            type='color'
                            id={`color-color-${index}`}
                            name={`color-color-${index}`}
                            value={rowColor[index].color}
                            onChange={(e) =>
                              onChange('color', index, 'color', e.target.value)
                            }
                          />
                        </div>
                        <div className='col-sm-3'>
                          <input
                            className='form-control'
                            type='text'
                            placeholder='Nhập mô tả'
                            value={rowColor[index].text}
                            id={`color-text-${index}`}
                            name={`color-text-${index}`}
                            onChange={(e) =>
                              onChange('color', index, 'text', e.target.value)
                            }
                          />
                        </div>
                        <div className='col-sm-1' style={{ margin: 'auto' }}>
                          <Tooltip title='Thêm mới'>
                            <GoDiffRemoved
                              style={{ fontSize: '20px', cursor: 'pointer' }}
                              onClick={() => onRemove('color', index)}
                            />
                          </Tooltip>
                        </div>
                        <div className='col-sm-6'></div>
                      </div>
                    ))}
                    {/* </div> */}
                    {rowColor && rowColor.length ? (
                      <div className='row' style={{ marginTop: '10px' }}>
                        <button type='submit' className='btn btn-primary'>
                          Lưu
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              {/* <hr></hr> */}
            </div>
          </form>
        </Spin>

        <Spin spinning={updatingIndex === 'brand' ? updatingLoading : false}>
          <hr></hr>
          <form
            className='form-create-product'
            onSubmit={(e) => submitHandler(e, 'brand')}
          >
            <div className='form-container'>
              <div
                className='container'
                style={{ height: 'min-content' }}
                key={'brand'}
              >
                <div className='row'>
                  <div className='col-sm-3'>Thương hiệu</div>
                  <div className='col-sm-9'>
                    <div className='row'>
                      {brands &&
                        brands.map((item) => (
                          <div className='col-sm-4'>{item}</div>
                        ))}
                    </div>

                    <div className='row'>
                      <Tooltip title='Thêm mới'>
                        <BsPlusSquare
                          style={{ fontSize: '20px', cursor: 'pointer' }}
                          onClick={() => onAdd('brand')}
                        />
                      </Tooltip>
                    </div>
                    {rowBrand.map((i, index) => (
                      <div className='row' style={{ marginTop: '20px' }}>
                        <div className='col-sm-2'>
                          <input
                            className='form-control'
                            type='text'
                            value={rowBrand[index]}
                            id={`brand-${index}`}
                            name={`brand-${index}`}
                            onChange={(e) =>
                              onChange('brand', index, null, e.target.value)
                            }
                          />
                        </div>
                        <div className='col-sm-1' style={{ margin: 'auto' }}>
                          <Tooltip title='Thêm mới'>
                            <GoDiffRemoved
                              style={{ fontSize: '20px', cursor: 'pointer' }}
                              onClick={() => onRemove('brand', index)}
                            />
                          </Tooltip>
                        </div>
                        <div className='col-sm-9'></div>
                      </div>
                    ))}
                    {/* </div> */}
                    {rowBrand && rowBrand.length ? (
                      <div className='row' style={{ marginTop: '10px' }}>
                        <button type='submit' className='btn btn-primary'>
                          Lưu
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <hr></hr>
            </div>
          </form>
        </Spin>

        <Spin spinning={updatingIndex === 'size' ? updatingLoading : false}>
          <hr></hr>
          <form
            className='form-create-product'
            onSubmit={(e) => submitHandler(e, 'size')}
          >
            <div className='form-container'>
              <div
                className='container'
                style={{ height: 'min-content' }}
                key={'size'}
              >
                <div className='row'>
                  <div className='col-sm-3'>Size</div>
                  <div className='col-sm-9'>
                    <div className='row'>
                      {sizes &&
                        sizes.map((item) => (
                          <div className='col-sm-1'>{item}</div>
                        ))}
                    </div>

                    <div className='row'>
                      <Tooltip title='Thêm mới'>
                        <BsPlusSquare
                          style={{ fontSize: '20px', cursor: 'pointer' }}
                          onClick={() => onAdd('size')}
                        />
                      </Tooltip>
                    </div>
                    {rowSize.map((i, index) => (
                      <div className='row' style={{ marginTop: '20px' }}>
                        <div className='col-sm-2'>
                          <input
                            className='form-control'
                            type='text'
                            id={`size-${index}`}
                            name={`size-${index}`}
                            value={rowSize[index]}
                            onChange={(e) =>
                              onChange('size', index, null, e.target.value)
                            }
                          />
                        </div>
                        <div className='col-sm-1' style={{ margin: 'auto' }}>
                          <Tooltip title='Thêm mới'>
                            <GoDiffRemoved
                              style={{ fontSize: '20px', cursor: 'pointer' }}
                              onClick={() => onRemove('size', index)}
                            />
                          </Tooltip>
                        </div>
                        <div className='col-sm-9'></div>
                      </div>
                    ))}
                    {/* </div> */}
                    {rowSize && rowSize.length ? (
                      <div className='row' style={{ marginTop: '10px' }}>
                        <button type='submit' className='btn btn-primary'>
                          Lưu
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <hr></hr>
            </div>
          </form>
        </Spin>

        <Spin
          spinning={
            updatingIndex === 'shipping_fee'
              ? updatingLoading || loadingProvince
              : false
          }
        >
          <hr></hr>
          <form
            className='form-create-product'
            onSubmit={(e) => submitHandler(e, 'shipping_fee')}
          >
            <div className='form-container'>
              <div
                className='container'
                style={{ height: 'min-content' }}
                key={'shipping_fee'}
              >
                <div className='row'>
                  <div className='col-sm-3'>Phí vận chuyển</div>
                  <div className='col-sm-9'>
                    {/* <div className='row'> */}
                    {fees &&
                      Object.entries(fees).map((item) => {
                        const provinceIndex =
                          provinces && provinces.length
                            ? provinces.findIndex(
                                (i) => parseInt(i.number) === parseInt(item[0])
                              )
                            : -1;
                        const province =
                          provinces &&
                          provinces.length &&
                          provinces[provinceIndex]
                            ? provinces[provinceIndex].name
                            : '';
                        return (
                          <div className='row'>
                            <div className='col-sm-3'>
                              {province
                                ? province
                                : item[0] === 'other'
                                ? 'Tỉnh thành khác'
                                : ''}
                            </div>
                            <div className='col-sm-3'>
                              {utils.vndFormat(item[1])}
                            </div>
                            <div className='col-sm-6'></div>
                          </div>
                        );
                      })}
                    {/* </div> */}

                    <div className='row'>
                      <Tooltip title='Thêm mới'>
                        <BsPlusSquare
                          style={{ fontSize: '20px', cursor: 'pointer' }}
                          onClick={() => onAdd('shipping_fee')}
                        />
                      </Tooltip>
                    </div>
                    {rowShipping.map((i, index) => (
                      <div className='row' style={{ marginTop: '20px' }}>
                        <div className='col-sm-4'>
                          <select
                            className='form-control'
                            value={rowShipping[index].province}
                            id={`shipping_fee-province-${index}`}
                            name={`shipping_fee-province-${index}`}
                            onChange={(e) =>
                              onChange(
                                'shipping_fee',
                                index,
                                'province',
                                e.target.value
                              )
                            }
                          >
                            <option>Chọn tỉnh thành</option>
                            {provinces &&
                              provinces.length &&
                              provinces
                                .filter(
                                  (i) =>
                                    !Object.entries(fees)
                                      .map((f) => parseInt(f[0]))
                                      .includes(i.number) &&
                                    !(rowShipping && rowShipping.length >= 1 && rowShipping.map(
                                      (s) => parseInt(s.province)
                                    )).includes(i.number)
                                )
                                .map((i) => (
                                  <option value={i.number} key={i.number}>
                                    {i.name}
                                  </option>
                                ))}
                          </select>
                        </div>
                        <div className='col-sm-4'>
                          <input
                            className='form-control'
                            type='text'
                            placeholder='Nhập phí'
                            value={rowShipping[index].price}
                            id={`shipping_fee-price-${index}`}
                            name={`shipping_fee-price-${index}`}
                            onChange={(e) =>
                              onChange(
                                'shipping_fee',
                                index,
                                'price',
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className='col-sm-1' style={{ margin: 'auto' }}>
                          <Tooltip title='Thêm mới'>
                            <GoDiffRemoved
                              style={{ fontSize: '20px', cursor: 'pointer' }}
                              onClick={() => onRemove('shipping_fee', index)}
                            />
                          </Tooltip>
                        </div>
                        <div className='col-sm-3'></div>
                      </div>
                    ))}
                    {/* </div> */}
                    {rowShipping && rowShipping.length ? (
                      <div className='row' style={{ marginTop: '10px' }}>
                        <button type='submit' className='btn btn-primary'>
                          Lưu
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <hr></hr>
            </div>
          </form>
        </Spin>
      </Spin>
    </DashboardScreen>
  );
};

export default RuleAdminScreen;
