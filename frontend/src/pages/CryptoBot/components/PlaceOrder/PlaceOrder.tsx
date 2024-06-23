import React, { useState } from 'react';
import { FaCrown } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';
import { convertToDecimalNumber, formatQuantity, formatToCurrency } from '../../../../utils/utils';
import SelectContract from './SelectContract';
import SelectOrderType from './SelectOrderType';
import SelectSide from './SelectSide';

interface Order {
  symbol: string;
  side: string;
  orderType: string;
  price?: string;
  quantity?: string;
  tif?: string;
  stopPrice?: string;
  isActive: boolean;
}

const PlaceOrder: React.FC = () => {
  const [order, setOrder] = useState<Order[]>([]);
  const [showLimitModal, setShowLimitModal] = useState(false);

  const addOrder = () => {
    if (order.length < 10) {
      setOrder([
        ...order,
        {
          symbol: '',
          side: '',
          orderType: '',
          isActive: false,
        },
      ]);
    } else {
      setShowLimitModal(true);
    }
  };

  const removeOrder = (index: number) => {
    setOrder(order.filter((_, i) => i !== index));
  };

  const toggleActive = (index: number) => {
    setOrder(
      order.map((order, i) =>
        i === index ? { ...order, isActive: !order.isActive } : order
      )
    );
  };

  const handleInputChange = (index: number, field: keyof Order, value: string) => {
    let updatedValue = value;
    if (field === 'quantity') {
      updatedValue = formatQuantity(value);
    } else if (field === 'price' || field === 'stopPrice') {
      updatedValue = formatToCurrency(convertToDecimalNumber(value));
      console.log(`Field: ${field}, Displayed Value: ${updatedValue}, Stored Value: ${convertToDecimalNumber(value)}`);
    }

    const updatedOrders = order.map((order, i) =>
      i === index ? { ...order, [field]: updatedValue } : order
    );
    setOrder(updatedOrders);
  };

  const handleOrderSelect = (index: number, orderType: string) => {
    setOrder(
      order.map((order, i) =>
        i === index ? { ...order, orderType } : order
      )
    );
  };

  const renderAdditionalInputs = (order: Order, index: number) => {
    if (order.orderType === 'Limit') {
      return (
        <div className="flex space-x-2">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded text-black w-28"
            placeholder="Time in Force"
            value={order.tif ?? ''}
            onChange={(e) => handleInputChange(index, 'tif', e.target.value)}
            disabled={order.isActive}
            data-tooltip-id='tif-tooltip'
            data-tooltip-content="Time in force. Ex.: GTC"
            data-tooltip-place='top'
          />
          <Tooltip id="tif-tooltip" opacity={2} style={{ backgroundColor: "rgb(16,89,127)", fontWeight: "bold" }} />
          <input
            type="text"
            className="p-2 border border-gray-300 rounded text-black w-28"
            placeholder="Quantidade"
            value={order.quantity ?? ''}
            onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
            disabled={order.isActive}
            maxLength={8}
            data-tooltip-id='qt-tooltip'
            data-tooltip-content="Quantidade. Ex.: 0.02"
            data-tooltip-place='top'
          />
          <Tooltip id="qt-tooltip" opacity={2} style={{ backgroundColor: "rgb(16,89,127)", fontWeight: "bold" }}/>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded text-black w-24"
            placeholder="Preço"
            value={order.price ?? ''}
            onChange={(e) => handleInputChange(index, 'price', e.target.value)}
            disabled={order.isActive}
            maxLength={8}
            data-tooltip-id='price-tooltip'
            data-tooltip-content="Preço. Ex.: 99.9 (U$)"
            data-tooltip-place='top'
          />
          <Tooltip id="price-tooltip" opacity={2} style={{ backgroundColor: "rgb(16,89,127)", fontWeight: "bold" }} />
        </div>
      );
    }

    if (order.orderType === 'Market') {
      return (
        <>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded text-black w-28"
            placeholder="Quantidade"
            value={order.quantity ?? ''}
            onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
            disabled={order.isActive}
            maxLength={8}
            data-tooltip-id='qt-tooltip'
            data-tooltip-content="Quantidade. Ex.: 0.02"
            data-tooltip-place='top'
          />
          <Tooltip id="qt-tooltip" opacity={2} style={{ backgroundColor: "rgb(16,89,127)", fontWeight: "bold" }}/>
        </>
      );
    }

    if (order.orderType === 'Stop' || order.orderType === 'Take Profit') {
      return (
        <div className="flex space-x-2">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded text-black w-28"
            placeholder="Quantidade"
            value={order.quantity ?? ''}
            onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
            disabled={order.isActive}
            maxLength={8}
            data-tooltip-id='qt-tooltip'
            data-tooltip-content="Quantidade. Ex.: 0.02"
            data-tooltip-place='top'
          />
          <Tooltip id="qt-tooltip" opacity={2} style={{ backgroundColor: "rgb(16,89,127)", fontWeight: "bold" }}/>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded text-black w-24"
            placeholder="Preço"
            value={order.price ?? ''}
            onChange={(e) => handleInputChange(index, 'price', e.target.value)}
            disabled={order.isActive}
            maxLength={8}
            data-tooltip-id='price-tooltip'
            data-tooltip-content="Preço. Ex.: 99.9 (U$)"
            data-tooltip-place='top'
          />
          <Tooltip id="price-tooltip" opacity={2} style={{ backgroundColor: "rgb(16,89,127)", fontWeight: "bold" }} />
          <input
            type="text"
            className="p-2 border border-gray-300 rounded text-black w-24"
            placeholder="Stop Price"
            value={order.stopPrice ?? ''}
            onChange={(e) => handleInputChange(index, 'stopPrice', e.target.value)}
            disabled={order.isActive}
            maxLength={8}
            data-tooltip-id='stop-price-tooltip'
            data-tooltip-content="Preço de parada. Ex.: 99.9 (U$)"
            data-tooltip-place='top'
          />
          <Tooltip id="stop-price-tooltip" opacity={2} style={{ backgroundColor: "rgb(16,89,127)", fontWeight: "bold" }}/>
        </div>
      );
    }

    return null;
  };

  const renderOrders = () => {
    return order.map((order, index) => (
      <tr key={index}>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
          <SelectContract disabled={order.isActive} />
        </td>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
          <SelectSide
            onSelect={(orderType) => handleOrderSelect(index, orderType)}
            disabled={order.isActive}
          />
        </td>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
          <SelectOrderType 
          onSelect={(orderType) => handleOrderSelect(index, orderType)}
          disabled={order.isActive} />
        </td>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
          {renderAdditionalInputs(order, index)}
        </td>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
          <button
            className={`p-2 border rounded ${order.isActive ? 'bg-green-500' : 'bg-red-500'}`}
            onClick={() => toggleActive(index)}
          >
            {order.isActive ? 'ON' : 'OFF'}
          </button>
        </td>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
          <button 
            className={`p-3 bg-secondary border rounded ${order.isActive ? 'cursor-not-allowed opacity-50' : ''}`} 
            onClick={() => !order.isActive && removeOrder(index)} 
            disabled={order.isActive}
          >
            <MdClose />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="text-center w-full h-full overflow-auto">
      {showLimitModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-lg text-secondary font-bold flex justify-center items-center">
              Atualize para o <span className="text-yellow-500 ml-1">Premium</span> <FaCrown className="text-yellow-500 ml-1" />
            </p>
            <p className="text-sm text-secondary mt-2">Atualize para um plano premium para adicionar mais de 10 ofertas.</p>
            <button
              className="mt-6 px-4 py-2 bg-secondary text-white rounded"
              onClick={() => setShowLimitModal(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
      <button className="my-8 p-2 bg-secondary text-white rounded" onClick={addOrder}>
        Nova Oferta
      </button>
      <div className="max-h-full">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-md text-center items-center">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">Cripto</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">Lado</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">Tipo de Oferta</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">Parâmetros</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900"></th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900"></th>
            </tr>
          </thead>
          <tbody>
            {renderOrders()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlaceOrder;