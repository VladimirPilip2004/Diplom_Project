import { useColorsStore } from "@/stores/useColorsStore";
import { useSizesStore } from "@/stores/useSizesStore";
import { reactive, computed, watch } from "vue";

interface FilterSection {
  color: boolean;
  size: boolean;
  category: boolean;
  [key: string]: boolean;
}

interface SelectedSizes {
  [key: string]: boolean;
}

interface SelectColors {
  [key: string]: boolean;
}

export const useAsideFilters = () => {
  const filterSection: FilterSection = reactive({
    color: true,
    size: true,
    category: true,
  })
  const selectedColors: SelectColors = reactive({})
  const selectedSizes: SelectedSizes = reactive({})

  const storeColors = useColorsStore()
  const storeSizes = useSizesStore()

  const toggleColor = (color: string) => {
    selectedColors[color] = !selectedColors[color]
  }

  const toggledSize = (size: string) => {
    selectedSizes[size] = !selectedSizes[size]
  }

  const removeColor = (color: string) => {
    storeColors.removeColor(color);
    delete selectedColors[color];
  }

  const removeSize = (size: string) => {
    storeSizes.removeSize(size);
    delete selectedSizes[size];
  }

  const selectedColorsArray = computed(() => {
    return Object.keys(selectedColors).filter(color => selectedColors[color])
  })

  const selectedSizesArray = computed(() => {
    return Object.keys(selectedSizes).filter(size => selectedSizes[size])
  })

  const isAccordion = (section: string) => computed(() => filterSection[section] ? 'flex' : 'hidden');

  watch(selectedColors, () => {
    storeColors.setColors(selectedColorsArray.value)
  })

  watch(selectedSizes, () => {
    storeSizes.setSizes(selectedSizesArray.value)
  })

  return {
    filterSection,
    selectedColors,
    selectedSizes,
    removeColor,
    removeSize,
    toggleColor,
    toggledSize,
    isAccordion,
  }
}