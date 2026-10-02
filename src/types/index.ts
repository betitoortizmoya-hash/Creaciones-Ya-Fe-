export type ProductCategory = 
  | 'todos'
  | 'bordados'
  | 'arreglos'
  | 'accesorios'
  | 'sublimacion';

export interface Product {
  id: string;
  name: string;
  category: 'bordados' | 'arreglos' | 'accesorios' | 'sublimacion';
  priceEstimate: string;
  estimatedPriceNum: number;
  subtitle: string;
  description: string;
  features: string[];
  badge?: string;
  colorOptions: { name: string; hex: string }[];
  customizable: boolean;
  baseProductId?: string; // Links directly to the Live Customizer base product
  defaultText?: string;
  tags: string[];
}

export type BaseProductType = 
  | 'apron'
  | 'onesie'
  | 'bubble-balloon'
  | 'tumbler'
  | 'puzzle'
  | 'backpack'
  | 'cap'
  | 'frame';

export interface BaseProductConfig {
  id: BaseProductType;
  name: string;
  categoryName: string;
  basePrice: number;
  description: string;
  fabricOrMaterial: string;
  colors: { name: string; hex: string; bgClass: string; isLight?: boolean }[];
  defaultColorHex: string;
  printableArea: {
    width: number;
    height: number;
    x: number;
    y: number;
    borderRadius?: string;
  };
  suggestedPhrases: string[];
}

export interface CanvasLayerText {
  id: string;
  type: 'text';
  text: string;
  fontFamily: string;
  fontName: string;
  color: string;
  colorName: string;
  fontSize: number;
  x: number;
  y: number;
  rotation: number;
  isCurved?: boolean;
  isBold?: boolean;
  letterSpacing?: number;
}

export interface CanvasLayerGraphic {
  id: string;
  type: 'graphic';
  graphicId: string;
  graphicName: string;
  svgIcon: string;
  color: string;
  size: number;
  x: number;
  y: number;
  rotation: number;
}

export interface CanvasLayerImage {
  id: string;
  type: 'image';
  src: string;
  name: string;
  width: number;
  height: number;
  x: number;
  y: number;
  rotation: number;
  shape: 'rect' | 'circle' | 'heart';
}

export type CanvasLayer = CanvasLayerText | CanvasLayerGraphic | CanvasLayerImage;

export interface CustomizationState {
  baseProductId: BaseProductType;
  selectedColorHex: string;
  selectedColorName: string;
  layers: CanvasLayer[];
  selectedLayerId: string | null;
  notes: string;
}

export interface CartItem {
  id: string;
  type: 'standard' | 'custom';
  title: string;
  subtitle: string;
  price: number;
  quantity: number;
  colorName?: string;
  colorHex?: string;
  customizationSummary?: {
    baseProduct: string;
    textLayers: string[];
    graphicsLayers: string[];
    hasPhoto: boolean;
    previewDataUrl?: string;
  };
  notes?: string;
}

export interface QuoteCustomerInfo {
  name: string;
  phone: string;
  email: string;
  eventDate: string;
  deliveryType: 'pickup' | 'delivery';
  deliveryAddress?: string;
  specialInstructions?: string;
}
