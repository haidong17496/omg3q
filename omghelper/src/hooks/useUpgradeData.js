// src/hooks/useUpgradeData.js
import { useState, useEffect } from 'react';
import { 
  getCategories, getQualities, getAllQualities, getUpgradeTypes, 
  getAvailableTypeIds, getAvailableQualIds, getUpgradeMatrixData 
} from '../database/queries';

export function useUpgradeData() {
  const [categories, setCategories] = useState([]);
  const [qualities, setQualities] = useState([]);
  const [allQualities, setAllQualities] = useState([]);
  const [types, setTypes] = useState([]);
  
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedQual, setSelectedQual] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  
  const [availableTypeIds, setAvailableTypeIds] = useState([]);
  const [availableQualIds, setAvailableQualIds] = useState([]);
  const [matrixData, setMatrixData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cats = getCategories();
    const quals = getQualities();
    const allQuals = getAllQualities();
    const upTypes = getUpgradeTypes();
    
    setCategories(cats);
    setQualities(quals);
    setAllQualities(allQuals);
    setTypes(upTypes);

    if (cats?.length > 0) setSelectedCat(cats[0]);
    if (quals?.length > 0) setSelectedQual(quals.find(x => x.code === 'do') || quals[0]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!selectedCat?.id || !selectedQual?.id) return;
    const vTids = getAvailableTypeIds(selectedCat.id, selectedQual.id);
    const vQids = getAvailableQualIds(selectedCat.id);
    setAvailableTypeIds(vTids);
    setAvailableQualIds(vQids);

    if (vTids.length > 0) {
      const isCurrentValid = selectedType && vTids.includes(selectedType.id);
      if (!isCurrentValid) {
        const first = types.find(t => t.id === vTids[0]);
        if (first) setSelectedType(first);
      }
    } else { setSelectedType(null); }
  }, [selectedCat, selectedQual, types]);

  useEffect(() => {
    if (selectedCat?.id && selectedQual?.id && selectedType?.id) {
      setMatrixData(getUpgradeMatrixData(selectedCat.id, selectedType.id, selectedQual.id));
    } else { setMatrixData([]); }
  }, [selectedCat, selectedQual, selectedType]);

  return {
    loading, categories, qualities, allQualities, types,
    selectedCat, setSelectedCat,
    selectedQual, setSelectedQual,
    selectedType, setSelectedType,
    availableTypeIds, availableQualIds, matrixData
  };
}