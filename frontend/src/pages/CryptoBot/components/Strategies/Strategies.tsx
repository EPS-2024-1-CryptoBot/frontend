import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';
import { formatInputValue } from '../../../../utils/utils';
import SelectContract from './SelectContract';
import SelectStrategy from './SelectStrategy';
import SelectTimeframe from './SelectTimeframe';


interface Strategy {
  strategyType: string;
  contract: string;
  timeframe: string;
  balance: string;
  tp: string;
  sl: string;
  isActive: boolean;
  rsiPeriods?: string;
  macdFastLength?: string;
  macdSlowLength?: string;
  macdSignalLength?: string;
  minimumVolume?: string;
}

const Strategies: React.FC = () => {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [showLimitModal, setShowLimitModal] = useState(false);

  const addStrategy = () => {
    if (strategies.length < 3) {
      setStrategies([
        ...strategies,
        {
          strategyType: '',
          contract: '',
          timeframe: '',
          balance: '',
          tp: '',
          sl: '',
          isActive: false,
        },
      ]);
    } else {
      setShowLimitModal(true);
    }
  };

  const removeStrategy = (index: number) => {
    setStrategies(strategies.filter((_, i) => i !== index));
  };

  const toggleActive = (index: number) => {
    setStrategies(
      strategies.map((strategy, i) =>
        i === index ? { ...strategy, isActive: !strategy.isActive } : strategy
      )
    );
  };

  const handleInputChange = (index: number, field: keyof Strategy, value: string) => {
    const boundedValue = formatInputValue(value);
    const updatedStrategies = strategies.map((strategy, i) =>
      i === index ? { ...strategy, [field]: boundedValue } : strategy
    );
    setStrategies(updatedStrategies);
  };

  const handleStrategySelect = (index: number, strategyType: string) => {
    setStrategies(
      strategies.map((strategy, i) =>
        i === index ? { ...strategy, strategyType } : strategy
      )
    );
  };

  const renderAdditionalInputs = (strategy: Strategy, index: number) => {
    if (strategy.strategyType === 'Technical') {
      return (
        <div className="flex space-x-2 bg-gray-900">
          <input
            type="text"
            className="p "
            placeholder="RSI Periods"
            value={strategy.rsiPeriods ?? ''}
            onChange={(e) => handleInputChange(index, 'rsiPeriods', e.target.value)}
            disabled={strategy.isActive}
            data-tooltip-id='rsi-tooltip'
            data-tooltip-content="Relative Strength Index (RSI) Periods"
            data-tooltip-place='top'
          />
          <Tooltip id="rsi-tooltip" opacity={2} style={{ backgroundColor: "rgb(16,89,127)", fontWeight: "bold" }} />
          <input
            type="text"
            className="p-2 border border-gray-300 rounded text-black w-24"
            placeholder="MACD Fast Length"
            value={strategy.macdFastLength ?? ''}
            onChange={(e) => handleInputChange(index, 'macdFastLength', e.target.value)}
            disabled={strategy.isActive}
            data-tooltip-id='macdfast-tooltip'
            data-tooltip-content="MACD Fast Length"
            data-tooltip-place='top'
          />
          <Tooltip id="macdfast-tooltip" opacity={2} style={{ backgroundColor: "rgb(16,89,127)", fontWeight: "bold" }} />
          <input
            type="text"
            className="p-2 border border-gray-300 rounded text-black w-24"
            placeholder="MACD Slow Length"
            value={strategy.macdSlowLength ?? ''}
            onChange={(e) => handleInputChange(index, 'macdSlowLength', e.target.value)}
            disabled={strategy.isActive}
            data-tooltip-id='macdslow-tooltip'
            data-tooltip-content="MACD Slow Length"
            data-tooltip-place='top'
          />
          <Tooltip id="macdslow-tooltip" opacity={2} style={{ backgroundColor: "rgb(16,89,127)", fontWeight: "bold" }} />
          <input
            type="text"
            className="p-2 border border-gray-300 rounded text-black w-24"
            placeholder="MACD Signal Length"
            value={strategy.macdSignalLength ?? ''}
            onChange={(e) => handleInputChange(index, 'macdSignalLength', e.target.value)}
            disabled={strategy.isActive}
            data-tooltip-id='macdsignal-tooltip'
            data-tooltip-content="MACD Signal Length"
            data-tooltip-place='top'
          />
          <Tooltip id="macdsignal-tooltip" opacity={2} style={{ backgroundColor: "rgb(16,89,127)", fontWeight: "bold" }} />
        </div>
      );
    }

    if (strategy.strategyType === 'Breakout') {
      return (
        <>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded text-black w-24"
            placeholder="Minimum Volume"
            value={strategy.minimumVolume ?? ''}
            onChange={(e) => handleInputChange(index, 'minimumVolume', e.target.value)}
            disabled={strategy.isActive}
            data-tooltip-id='mv-tooltip'
            data-tooltip-content="Minimum Volume required for breakout"
            data-tooltip-place='top'
          />
          <Tooltip id="mv-tooltip" opacity={2} style={{ backgroundColor: "rgb(16,89,127)", fontWeight: "bold" }} />
        </>
      );
    }

    return null;
  };

  const renderStrategies = () => {
    return strategies.map((strategy, index) => (
      <tr key={index}>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 bg-gray-900">
          <SelectStrategy
            onSelect={(strategyType) => handleStrategySelect(index, strategyType)}
            disabled={strategy.isActive}
          />
        </td>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 bg-gray-900">
          <SelectContract disabled={strategy.isActive} />
        </td>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 bg-gray-900">
          <SelectTimeframe disabled={strategy.isActive} />
        </td>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 bg-gray-900">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded text-black w-24"
            placeholder="Balance %"
            value={strategy.balance}
            onChange={(e) => handleInputChange(index, 'balance', e.target.value)}
            disabled={strategy.isActive}
            maxLength={5}
            data-tooltip-id='balance-tooltip'
            data-tooltip-content="% of your Balance"
            data-tooltip-place='top'
          />
          <Tooltip id="balance-tooltip" opacity={2} style={{ backgroundColor: "rgb(16,89,127)", fontWeight: "bold" }} />
        </td>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 bg-gray-900">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded text-black w-16"
            placeholder="TP %"
            value={strategy.tp}
            onChange={(e) => handleInputChange(index, 'tp', e.target.value)}
            disabled={strategy.isActive}
            maxLength={5}
            data-tooltip-id='tp-tooltip'
            data-tooltip-content="Take Profit %"
            data-tooltip-place='top'
          />
          <Tooltip id="tp-tooltip" opacity={2} style={{ backgroundColor: "rgb(16,89,127)", fontWeight: "bold" }} />
        </td>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 bg-gray-900">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded text-black w-16"
            placeholder="SL %"
            value={strategy.sl}
            onChange={(e) => handleInputChange(index, 'sl', e.target.value)}
            disabled={strategy.isActive}
            maxLength={5}
            data-tooltip-id='sl-tooltip'
            data-tooltip-content="Stop Loss %"
            data-tooltip-place='top'
          />
          <Tooltip id="sl-tooltip" opacity={2} style={{ backgroundColor: "rgb(16,89,127)", fontWeight: "bold" }} />
        </td>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 bg-gray-900">
          {renderAdditionalInputs(strategy, index)}
        </td>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 bg-gray-900">
          <button
            className={`p-2 border rounded ${strategy.isActive ? 'bg-green-500' : 'bg-red-500'}`}
            onClick={() => toggleActive(index)}
          >
            {strategy.isActive ? 'ON' : 'OFF'}
          </button>
        </td>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 bg-gray-900">
          <button 
            className={`p-3 bg-secondary border rounded ${strategy.isActive ? 'cursor-not-allowed opacity-50' : ''}`} 
            onClick={() => !strategy.isActive && removeStrategy(index)} 
            disabled={strategy.isActive}
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
            <p className="text-lg text-secondary font-bold">Upgrade to Premium</p>
            <p className="text-sm text-secondary">Upgrade to a premium plan to add more than 3 strategies.</p>
            <button
              className="mt-2 px-4 py-2 bg-secondary text-white rounded"
              onClick={() => setShowLimitModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <button className="my-4 p-2 bg-secondary text-white rounded" onClick={addStrategy}>
        Add Strategy
      </button>
      <div className="overflow-auto max-h-full">
        <table className="min-w-full bg-gray-800 dark:bg-gray-800 shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900">Strategy Type</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900">Contract</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900">Timeframe</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900">Balance %</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900">TP %</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900">SL %</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900">Parameters</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900"></th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900"></th>
            </tr>
          </thead>
          <tbody>
            {renderStrategies()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Strategies;