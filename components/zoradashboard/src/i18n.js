import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {}
  },
  de: {
    translation: {
      'Language changed': 'Sprache geändert',
      'Blank Page': 'Leere Seiten',
      'Card Headers': 'Kartenüberschriften',
      'Data States': 'Datenstatus',
      'Data Stats': 'Datenstatistiken',
      'General Settings': 'Allgemeine Einstellungen',
      'Image Uploader': 'Bild-Uploader',
      'Page Headers': 'Seitenüberschriften',
      Account: 'Konto',
      Activity: 'Aktivität',
      Billing: 'Abrechnung',
      Buttons: 'Tasten',
      Colors: 'Farben',
      Components: 'Komponenten',
      Create: 'Schaffen',
      Customers: 'Kunden',
      Details: 'Einzelheiten',
      Documentation: 'Dokumentation',
      Foundation: 'Stiftung',
      Inputs: 'Eingänge',
      Insights: 'Einblicke',
      Inventory: 'Inventar',
      Invoices: 'Rechnungen',
      List: 'Aufführen',
      Lists: 'Listen',
      Notifications: 'Benachrichtigungen',
      Onboarding: 'Onboarding',
      Orders: 'Aufträge',
      Organization: 'Organisationen',
      Overview: 'Überblick',
      Preview: 'Vorschau',
      Products: 'Produkte',
      Reports: 'Berichte',
      Sales: 'Der Umsatz',
      Shadows: 'Schatten',
      Summary: 'Zusammenfassung',
      Tables: 'Tabellen',
      Team: 'Team',
      Typography: 'Typografie'
    }
  },
  es: {
    translation: {
      'Language changed': 'Idioma cambianda',
      'Blank Page': 'Paginas en Blanco',
      'Card Headers': 'Encabezados de Tarjetas',
      'Data States': 'Estados de Datos',
      'Data Stats': 'Estadísticas de Datos',
      'General Settings': 'Configuración General',
      'Image Uploader': 'Cargador de Imágenes',
      'Page Headers': 'Encabezados de Página',
      Account: 'Cuenta',
      Activity: 'Actividad',
      Billing: 'Facturación',
      Buttons: 'Botones',
      Colors: 'Colores',
      Components: 'Componentes',
      Create: 'Crear',
      Customers: 'Clientes',
      Details: 'Detalles',
      Documentation: 'Documentación',
      Foundation: 'Fundación',
      Inputs: 'Entradas',
      Insights: 'Perspectivas',
      Inventory: 'Inventario',
      Invoices: 'Facturas',
      List: 'Lista',
      Lists: 'Listas',
      Notifications: 'Notificaciones',
      Onboarding: 'Inducción',
      Orders: 'Pedidos',
      Organization: 'Organizaciones',
      Overview: 'Visión general',
      Preview: 'Avance',
      Products: 'Productos',
      Reports: 'Informes',
      Sales: 'Ventas',
      Shadows: 'Sombras',
      Summary: 'Resumen',
      Tables: 'Tabeles',
      Team: 'Equipo',
      Typography: 'Tipografía'
    }
  }
};

export const initializeI18n = (lng) => {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      }
    });
};
