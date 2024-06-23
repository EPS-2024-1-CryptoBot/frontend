import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const strategies = ['Technical', 'Breakout'];

interface SelectStrategyProps {
  onSelect: (strategy: string) => void;
  disabled?: boolean;
}

const SelectStrategy: React.FC<SelectStrategyProps> = ({ onSelect, disabled }) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState('Strategy');

  const toggleActive = () => {
    if (!disabled) {
      setIsActive(!isActive);
    }
  };

  const handleSelect = (strategy: string) => {
    setSelected(strategy);
    onSelect(strategy); // Notify parent component of the selected strategy
    setIsActive(false);
  };

  return (
    <div className="relative mt-2">
      <button
      className={`border border-gray-400 p-2 w-32 rounded cursor-pointer flex justify-between items-center ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      onClick={toggleActive}
      >
        <span>{selected}</span>
        {isActive ? (
          <FaChevronUp className="w-5 h-5" />
        ) : (
          <FaChevronDown className="w-5 h-5" />
        )}
      </button>
      {isActive && !disabled && (
        <div className="border border-gray-400 rounded mt-1 w-52 absolute z-10 bg-white p-2">
          <ul className="max-h-64 overflow-auto text-sm text-left text-black">
            {strategies.length ? (
              strategies.map((strategy) => (
                <option
                  key={strategy}
                  className={`cursor-pointer p-1 rounded ${
                    strategy === selected ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => handleSelect(strategy)}
                >
                  {strategy}
                </option>
              ))
            ) : (
              <li className="p-1">Nenhum item encontrado</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectStrategy;