export var arEG = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'إظهر العنوان'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'إذهب الى الصفحة الأولى';
          }

          if (type === 'last') {
            return 'إذهب الي الصفحة الأخيرة';
          }

          if (type === 'next') {
            return 'إذهب الى الصفحة التالية';
          } // if (type === 'previous') {


          return 'إذهب الى الصفحة السابقة';
        },
        labelRowsPerPage: 'عدد الصفوف في الصفحة:',
        labelDisplayedRows: function labelDisplayedRows(_ref) {
          var from = _ref.from,
              to = _ref.to,
              count = _ref.count;
          return "".concat(from, "-").concat(to, " \u0645\u0646 ").concat(count !== -1 ? count : " \u0623\u0643\u062B\u0631 \u0645\u0646".concat(to));
        }
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " ").concat(value !== 1 ? 'نجوم' : 'نجمة');
        },
        emptyLabelText: 'فارغ'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'مسح',
        closeText: 'إغلاق',
        loadingText: 'يتم التحميل…',
        noOptionsText: 'لا يوجد خيارات',
        openText: 'فتح'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'إغلاق'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'التنقل عبر الصفحات',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "".concat(selected ? '' : 'إذهب إلى ', " \u0635\u0641\u062D\u0629 ").concat(page);
          }

          if (type === 'first') {
            return 'إذهب الى الصفحة الأولى';
          }

          if (type === 'last') {
            return 'إذهب الي الصفحة الأخيرة';
          }

          if (type === 'next') {
            return 'إذهب الى الصفحة التالية';
          } // if (type === 'previous') {


          return 'إذهب الى الصفحة السابقة';
        }
      }
    }
  }
};
export var azAZ = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Yolu göstər'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'Birinci səhifəyə keç';
          }

          if (type === 'last') {
            return 'Sonuncu səhifəyə keç';
          }

          if (type === 'next') {
            return 'Növbəti səhifəyə keç';
          } // if (type === 'previous') {


          return 'Əvvəlki səhifəyə keç';
        },
        labelRowsPerPage: 'Səhifəyə düşən sətrlər:' // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} dən ${count !== -1 ? count : `more than ${to}`}`,

      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          var pluralForm = 'Ulduz';
          var lastDigit = value % 10;

          if (lastDigit > 1 && lastDigit < 5) {
            pluralForm = 'Ulduzlar';
          }

          return "".concat(value, " ").concat(pluralForm);
        },
        emptyLabelText: 'Boş'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Silmək',
        closeText: 'Bağlamaq',
        loadingText: 'Yüklənir…',
        noOptionsText: 'Seçimlər mövcud deyil',
        openText: 'Открыть'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Bağlamaq'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Səhifənin naviqasiyası',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "".concat(page, " ").concat(selected ? 'səhifə' : 'səhifəyə keç');
          }

          if (type === 'first') {
            return 'Birinci səhifəyə keç';
          }

          if (type === 'last') {
            return 'Sonuncu səhifəyə keç';
          }

          if (type === 'next') {
            return 'Növbəti səhifəyə keç';
          } // if (type === 'previous') {


          return 'Əvvəlki səhifəyə keç';
        }
      }
    }
  }
};
export var bnBD = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'পথ দেখান'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'প্রথম পৃষ্ঠায় যান';
          }

          if (type === 'last') {
            return 'শেষ পৃষ্ঠায় যান';
          }

          if (type === 'next') {
            return 'পরবর্তী পৃষ্ঠায় যান';
          } // if (type === 'previous') {


          return 'আগের পৃষ্ঠায় যান';
        },
        labelRowsPerPage: 'প্রতি পৃষ্ঠায় সারি:',
        labelDisplayedRows: function labelDisplayedRows(_ref2) {
          var from = _ref2.from,
              to = _ref2.to,
              count = _ref2.count;
          return "".concat(from, "-").concat(to, " / ").concat(count !== -1 ? count : "".concat(to, " \u09A5\u09C7\u0995\u09C7 \u09AC\u09C7\u09B6\u09BF"));
        }
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " \u09B8\u09CD\u099F\u09BE\u09B0");
        },
        emptyLabelText: 'খালি'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'পরিষ্কার করুন',
        closeText: 'বন্ধ করুন',
        loadingText: 'লোড হচ্ছে…',
        noOptionsText: 'কোন অপশন নেই',
        openText: 'ওপেন করুন'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'বন্ধ করুন'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'পেজিনেশন নেভিগেশন',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "".concat(selected ? '' : 'যান ', "\u09AA\u09C3\u09B7\u09CD\u09A0\u09BE ").concat(page, "-\u098F");
          }

          if (type === 'first') {
            return 'প্রথম পৃষ্ঠায় যান';
          }

          if (type === 'last') {
            return 'শেষ পৃষ্ঠায় যান';
          }

          if (type === 'next') {
            return 'পরবর্তী পৃষ্ঠায় যান';
          } // if (type === 'previous') {


          return 'আগের পৃষ্ঠায় যান';
        }
      }
    }
  }
};
export var bgBG = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Показване на пътя'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'Отиди на първата страница';
          }

          if (type === 'last') {
            return 'Отиди на последната страница';
          }

          if (type === 'next') {
            return 'Отиди на следващата страница';
          } // if (type === 'previous') {


          return 'Отиди на предишната страница';
        },
        labelRowsPerPage: 'Редове на страница:' // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} от ${count !== -1 ? count : `more than ${to}`}`,

      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " \u0417\u0432\u0435\u0437\u0434").concat(value !== 1 ? 'и' : 'а');
        },
        emptyLabelText: 'Изчисти'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Изчисти',
        closeText: 'Затвори',
        loadingText: 'Зареждане…',
        noOptionsText: 'Няма налични опции',
        openText: 'Отвори'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Затвори'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Пагинация',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "".concat(selected ? '' : 'Към ', "\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 ").concat(page);
          }

          if (type === 'first') {
            return 'Отиди на първата страница';
          }

          if (type === 'last') {
            return 'Отиди на последната страница';
          }

          if (type === 'next') {
            return 'Отиди на следващата страница';
          } // if (type === 'previous') {


          return 'Отиди на предишната страница';
        }
      }
    }
  }
};
export var caES = {
  components: {
    // MuiBreadcrumbs: {
    //   defaultProps: {
    //    expandText: 'Show path',
    //   },
    // },
    MuiTablePagination: {
      defaultProps: {
        // getItemAriaLabel: (type) => {
        //   if (type === 'first') {
        //     return 'Go to first page';
        //   }
        //   if (type === 'last') {
        //     return 'Go to last page';
        //   }
        //   if (type === 'next') {
        //     return 'Go to next page';
        //   }
        //   // if (type === 'previous') {
        //   return 'Go to previous page';
        // },
        labelRowsPerPage: 'Files per pàgina:' // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} de ${count !== -1 ? count : `more than ${to}`}`,

      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " ").concat(value !== 1 ? 'Estrelles' : 'Estrella');
        },
        emptyLabelText: 'Buit'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Netejar',
        closeText: 'Tancar',
        loadingText: 'Carregant…',
        noOptionsText: 'Sense opcions',
        openText: 'Obert'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Tancat'
      }
    } // MuiPagination: {
    //   defaultProps: {
    //     'aria-label': 'Pagination navigation',
    //     getItemAriaLabel: (type, page, selected) => {
    //       if (type === 'page') {
    //         return `${selected ? '' : 'Go to '}page ${page}`;
    //       }
    //       if (type === 'first') {
    //         return 'Go to first page';
    //       }
    //       if (type === 'last') {
    //         return 'Go to last page';
    //       }
    //       if (type === 'next') {
    //         return 'Go to next page';
    //       }
    //       // if (type === 'previous') {
    //       return 'Go to previous page';
    //     },
    //   },
    // },

  }
};
export var csCZ = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Ukázat cestu'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'Jít na první stránku';
          }

          if (type === 'last') {
            return 'Jít na poslední stránku';
          }

          if (type === 'next') {
            return 'Jít na další stránku';
          } // if (type === 'previous') {


          return 'Jít na předchozí stránku';
        },
        labelRowsPerPage: 'Řádků na stránce:',
        labelDisplayedRows: function labelDisplayedRows(_ref3) {
          var from = _ref3.from,
              to = _ref3.to,
              count = _ref3.count;
          return "".concat(from, "-").concat(to, " z ").concat(count !== -1 ? count : "v\xEDce ne\u017E ".concat(to));
        }
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          if (value === 1) {
            return "".concat(value, " hv\u011Bzdi\u010Dka");
          }

          if (value >= 2 && value <= 4) {
            return "".concat(value, " hv\u011Bzdi\u010Dky");
          }

          return "".concat(value, " hv\u011Bzdi\u010Dek");
        },
        emptyLabelText: 'Prázdné'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Vymazat',
        closeText: 'Zavřít',
        loadingText: 'Načítání…',
        noOptionsText: 'Žádné možnosti',
        openText: 'Otevřít'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Zavřít'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigace stránkováním',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "".concat(selected ? '' : 'Jít na ').concat(page, " str\xE1nku");
          }

          if (type === 'first') {
            return 'Jít na první stránku';
          }

          if (type === 'last') {
            return 'Jít na poslední stránku';
          }

          if (type === 'next') {
            return 'Jít na další stránku';
          } // if (type === 'previous') {


          return 'Jít na předchozí stránku';
        }
      }
    }
  }
};
export var deDE = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Pfad anzeigen'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'Zur ersten Seite';
          }

          if (type === 'last') {
            return 'Zur letzten Seite';
          }

          if (type === 'next') {
            return 'Zur nächsten Seite';
          } // if (type === 'previous') {


          return 'Zur vorherigen Seite';
        },
        labelRowsPerPage: 'Zeilen pro Seite:',
        labelDisplayedRows: function labelDisplayedRows(_ref4) {
          var from = _ref4.from,
              to = _ref4.to,
              count = _ref4.count;
          return "".concat(from, "-").concat(to, " von ").concat(count !== -1 ? count : "mehr als ".concat(to));
        }
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " ").concat(value !== 1 ? 'Sterne' : 'Stern');
        },
        emptyLabelText: 'Keine Wertung'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Leeren',
        closeText: 'Schließen',
        loadingText: 'Wird geladen…',
        noOptionsText: 'Keine Optionen',
        openText: 'Öffnen'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Schließen'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigation via Seitennummerierung',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "".concat(selected ? '' : 'Gehe zu ', "Seite ").concat(page);
          }

          if (type === 'first') {
            return 'Zur ersten Seite';
          }

          if (type === 'last') {
            return 'Zur letzten Seite';
          }

          if (type === 'next') {
            return 'Zur nächsten Seite';
          } // if (type === 'previous') {


          return 'Zur vorherigen Seite';
        }
      }
    }
  }
};
export var elGR = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Εμφάνιση διαδρομής'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'Πρώτη σελίδα';
          }

          if (type === 'last') {
            return 'Τελευταία σελίδα';
          }

          if (type === 'next') {
            return 'Επόμενη σελίδα';
          } // if (type === "previous") {


          return 'Προηγούμενη σελίδα';
        },
        labelRowsPerPage: 'Γραμμές ανα σελίδα:',
        labelDisplayedRows: function labelDisplayedRows(_ref5) {
          var from = _ref5.from,
              to = _ref5.to,
              count = _ref5.count;
          return "".concat(from, "-").concat(to, " \u03B1\u03C0\u03CC ").concat(count !== -1 ? count : "\u03C0\u03AC\u03BD\u03C9 \u03B1\u03C0\u03CC ".concat(to));
        }
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " \u0391\u03C3\u03C4\u03AD\u03C1\u03B9").concat(value !== 1 ? 'α' : '');
        },
        emptyLabelText: 'Χωρίς βαθμολόγηση'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Καθαρισμός',
        closeText: 'Κλείσιμο',
        loadingText: 'Φόρτωση…',
        noOptionsText: 'Δεν υπάρχουν επιλογές',
        openText: 'Άνοιγμα'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Κλείσιμο'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Πλοήγηση σε σελίδες',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "".concat(selected ? '' : 'Μετάβαση ', "\u03C3\u03B5\u03BB\u03AF\u03B4\u03B1 ").concat(page);
          }

          if (type === 'first') {
            return 'Πρώτη σελίδα';
          }

          if (type === 'last') {
            return 'Τελευταία σελίδα';
          }

          if (type === 'next') {
            return 'Επόμενη σελίδα';
          } // if (type === "previous") {


          return 'Προηγούμενη σελίδα';
        }
      }
    }
  }
}; // default

export var enUS = {
  /*
  components: {
    MuiBreadcrumbs: { defaultProps: {
      expandText: 'Show path',
    }},
    MuiTablePagination: { defaultProps: { 
      getItemAriaLabel: (type) => {
        if (type === 'first') {
          return 'Go to first page';
        }
        if (type === 'last') {
          return 'Go to last page';
        }
        if (type === 'next') {
          return 'Go to next page';
        }
        // if (type === 'previous') {
        return 'Go to previous page';
      },
      labelRowsPerPage: 'Rows per page:',
      labelDisplayedRows: ({ from, to, count }) =>
  `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`,
    }},
    MuiRating: { defaultProps: { 
      getLabelText: value => `${value} Star${value !== 1 ? 's' : ''}`,
      emptyLabelText: 'Empty',
    }},
    MuiAutocomplete: { defaultProps: { 
      clearText: 'Clear',
      closeText: 'Close',
      loadingText: 'Loading…',
      noOptionsText: 'No options',
      openText: 'Open',
    }},
    MuiAlert: { defaultProps: { 
      closeText: 'Close',
    }},
    MuiPagination: {  defaultProps: { 
      'aria-label': 'Pagination navigation',
      getItemAriaLabel: (type, page, selected) => {
        if (type === 'page') {
          return `${selected ? '' : 'Go to '}page ${page}`;
        }
        if (type === 'first') {
          return 'Go to first page';
        }
        if (type === 'last') {
          return 'Go to last page';
        }
        if (type === 'next') {
          return 'Go to next page';
        }
        // if (type === 'previous') {
        return 'Go to previous page';
      },
    },
  },
  */
};
export var esES = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Mostrar ruta'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'Ir a la primera página';
          }

          if (type === 'last') {
            return 'Ir a la última página';
          }

          if (type === 'next') {
            return 'Ir a la página siguiente';
          } // if (type === 'previous') {


          return 'Ir a la página anterior';
        },
        labelRowsPerPage: 'Filas por página:',
        labelDisplayedRows: function labelDisplayedRows(_ref6) {
          var from = _ref6.from,
              to = _ref6.to,
              count = _ref6.count;
          return "".concat(from, "-").concat(to, " de ").concat(count !== -1 ? count : "m\xE1s de ".concat(to));
        }
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " Estrella").concat(value !== 1 ? 's' : '');
        },
        emptyLabelText: 'Vacío'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Limpiar',
        closeText: 'Cerrar',
        loadingText: 'Cargando…',
        noOptionsText: 'Sin opciones',
        openText: 'Abierto'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Cerrar'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Paginador',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "".concat(selected ? '' : 'Ir a la ', "p\xE1gina ").concat(page);
          }

          if (type === 'first') {
            return 'Ir a la primera página';
          }

          if (type === 'last') {
            return 'Ir a la última página';
          }

          if (type === 'next') {
            return 'Ir a la página siguiente';
          } // if (type === 'previous') {


          return 'Ir a la página anterior';
        }
      }
    }
  }
};
export var etEE = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Näita teed'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'Vali esimene lehekülg';
          }

          if (type === 'last') {
            return 'Vali viimane lehekülg';
          }

          if (type === 'next') {
            return 'Vali järgmine lehekülg';
          } // if (type === 'previous') {


          return 'Vali eelmine lehekülg';
        },
        labelRowsPerPage: 'Ridu leheküljel:' // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} / ${count !== -1 ? count : `more than ${to}`}`,

      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " T\xE4rn").concat(value !== 1 ? 'i' : '');
        },
        emptyLabelText: 'Tühi'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Tühjenda',
        closeText: 'Sulge',
        loadingText: 'Laen…',
        noOptionsText: 'Valikuid ei ole',
        openText: 'Ava'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Sulge'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Lehekülgede valik',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "".concat(selected ? '' : 'Vali ', "lehek\xFClg ").concat(page);
          }

          if (type === 'first') {
            return 'Vali esimene lehekülg';
          }

          if (type === 'last') {
            return 'Vali viimane lehekülg';
          }

          if (type === 'next') {
            return 'Vali järgmine lehekülg';
          } // if (type === 'previous') {


          return 'Vali eelmine lehekülg';
        }
      }
    }
  }
};
export var faIR = {
  components: {
    // MuiBreadcrumbs: {
    //   defaultProps: {
    //     expandText: 'Show path',
    //   },
    // },
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'نمایش مسیر'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'رفتن به اولین صفحه';
          }

          if (type === 'last') {
            return 'رفتن به آخرین صفحه';
          }

          if (type === 'next') {
            return 'رفتن به صفحه‌ی بعدی';
          } // if (type === 'previous') {


          return 'رفتن به صفحه‌ی قبلی';
        },
        labelRowsPerPage: 'تعداد سطرهای هر صفحه:' // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} از ${count !== -1 ? count : `more than ${to}`}`,

      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " \u0633\u062A\u0627\u0631\u0647");
        },
        emptyLabelText: 'خالی'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'پاک‌کردن',
        closeText: 'بستن',
        loadingText: 'در حال بارگذاری…',
        noOptionsText: 'بی‌نتیجه',
        openText: 'بازکردن'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'بستن'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'ناوبری صفحه',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "".concat(selected ? '' : 'رفتن به ', "\u0635\u0641\u062D\u0647\u0654 ").concat(page);
          }

          if (type === 'first') {
            return 'رفتن به اولین صفحه';
          }

          if (type === 'last') {
            return 'رفتن به آخرین صفحه';
          }

          if (type === 'next') {
            return 'رفتن به صفحه‌ی بعدی';
          } // if (type === 'previous') {


          return 'رفتن به صفحه‌ی قبلی';
        }
      }
    }
  }
};
export var fiFI = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Näytä reitti'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'Mene ensimmäiselle sivulle';
          }

          if (type === 'last') {
            return 'Mene viimeiselle sivulle';
          }

          if (type === 'next') {
            return 'Mene seuraavalle sivulle';
          } // if (type === 'previous') {


          return 'Mene edelliselle sivulle';
        },
        labelRowsPerPage: 'Rivejä per sivu:' // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} / ${count !== -1 ? count : `more than ${to}`}`,

      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " T\xE4ht").concat(value !== 1 ? 'eä' : 'i');
        },
        emptyLabelText: 'Tyhjä'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Tyhjennä',
        closeText: 'Sulje',
        loadingText: 'Ladataan…',
        noOptionsText: 'Ei valintoja',
        openText: 'Avaa'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Sulje'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Sivutus navigaatio',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "".concat(selected ? 'sivu' : 'Mene sivulle', " ").concat(page);
          }

          if (type === 'first') {
            return 'Mene ensimmäiselle sivulle';
          }

          if (type === 'last') {
            return 'Mene viimeiselle sivulle';
          }

          if (type === 'next') {
            return 'Mene seuraavalle sivulle';
          } // if (type === 'previous') {


          return 'Mene edelliselle sivulle';
        }
      }
    }
  }
};
export var frFR = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Montrer le chemin'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'Aller à la première page';
          }

          if (type === 'last') {
            return 'Aller à la dernière page';
          }

          if (type === 'next') {
            return 'Aller à la page suivante';
          } // if (type === 'previous') {


          return 'Aller à la page précédente';
        },
        labelRowsPerPage: 'Lignes par page :',
        labelDisplayedRows: function labelDisplayedRows(_ref7) {
          var from = _ref7.from,
              to = _ref7.to,
              count = _ref7.count;
          return "".concat(from, "-").concat(to, " sur ").concat(count !== -1 ? count : "plus que ".concat(to));
        }
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " Etoile").concat(value !== 1 ? 's' : '');
        },
        emptyLabelText: 'Vide'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Vider',
        closeText: 'Fermer',
        loadingText: 'Chargement…',
        noOptionsText: 'Pas de résultats',
        openText: 'Ouvrir'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Fermer'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'navigation de pagination',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "".concat(selected ? '' : 'Aller à la ', "page ").concat(page);
          }

          if (type === 'first') {
            return 'Aller à la première page';
          }

          if (type === 'last') {
            return 'Aller à la dernière page';
          }

          if (type === 'next') {
            return 'Aller à la page suivante';
          } // if (type === 'previous') {


          return 'Aller à la page précédente';
        }
      }
    }
  }
};
export var heIL = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'הצג נתיב'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'לעמוד הראשון';
          }

          if (type === 'last') {
            return 'לעמוד האחרון';
          }

          if (type === 'next') {
            return 'לעמוד הבא';
          } // if (type === 'previous') {


          return 'לעמוד הקודם';
        },
        labelRowsPerPage: 'שורות בעמוד:',
        labelDisplayedRows: function labelDisplayedRows(_ref8) {
          var from = _ref8.from,
              to = _ref8.to,
              count = _ref8.count;
          return "".concat(from, "-").concat(to, " \u05DE\u05EA\u05D5\u05DA ").concat(count !== -1 ? count : "\u05D9\u05D5\u05EA\u05E8 \u05DE ".concat(to));
        }
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " \u05DB\u05D5\u05DB\u05D1").concat(value !== 1 ? 'ים' : '');
        },
        emptyLabelText: 'ריק'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'נקה',
        closeText: 'סגור',
        loadingText: 'טוען…',
        noOptionsText: 'אין אופציות',
        openText: 'פתח'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'סגור'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'ניווט בעמודים',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "".concat(selected ? '' : 'ל ', "\u05E2\u05DE\u05D5\u05D3 ").concat(page);
          }

          if (type === 'first') {
            return 'לעמוד הראשון';
          }

          if (type === 'last') {
            return 'לעמוד האחרון';
          }

          if (type === 'next') {
            return 'לעמוד הבא';
          } // if (type === 'previous') {


          return 'לעמוד הקודם';
        }
      }
    }
  }
};
export var hiIN = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'रास्ता दिखायें'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'पहले पृष्ठ पर जाएँ';
          }

          if (type === 'last') {
            return 'अंतिम पृष्ठ पर जाएँ';
          }

          if (type === 'next') {
            return 'अगले पृष्ठ पर जाएँ';
          } // if (type === 'previous') {


          return 'पिछले पृष्ठ पर जाएँ';
        },
        labelRowsPerPage: 'पंक्तियाँ प्रति पृष्ठ:',
        labelDisplayedRows: function labelDisplayedRows(_ref9) {
          var from = _ref9.from,
              to = _ref9.to,
              count = _ref9.count;
          return "".concat(from, "-").concat(to === -1 ? count : to, " \u0915\u0941\u0932 ").concat(count, " \u092E\u0947\u0902");
        }
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " \u0924\u093E\u0930").concat(value !== 1 ? 'े' : 'ा');
        },
        emptyLabelText: 'रिक्त'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'हटायें',
        closeText: 'बंद करें',
        loadingText: 'लोड हो रहा है…',
        noOptionsText: 'कोई विकल्प नहीं',
        openText: 'खोलें'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'बंद करें'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'पृस्ठानुसार संचालन',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "\u092A\u0943\u0937\u094D\u0920 ".concat(page, " ").concat(selected ? '' : ' पर जाएँ');
          }

          if (type === 'first') {
            return 'पहले पृष्ठ पर जाएँ';
          }

          if (type === 'last') {
            return 'अंतिम पृष्ठ पर जाएँ';
          }

          if (type === 'next') {
            return 'अगले पृष्ठ पर जाएँ';
          } // if (type === 'previous') {


          return 'पिछले पृष्ठ पर जाएँ';
        }
      }
    }
  }
};
export var huHU = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Útvonal'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'Első oldalra';
          }

          if (type === 'last') {
            return 'Utolsó oldalra';
          }

          if (type === 'next') {
            return 'Következő oldalra';
          } // if (type === 'previous') {


          return 'Előző oldalra';
        },
        labelRowsPerPage: 'Sorok száma:' // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} / ${count !== -1 ? count : `more than ${to}`}`,

      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " Csillag");
        },
        emptyLabelText: 'Üres'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Törlés',
        closeText: 'Bezárás',
        loadingText: 'Töltés…',
        noOptionsText: 'Nincs találat',
        openText: 'Megnyitás'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Bezárás'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Lapozás',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "".concat(page, ". oldal").concat(selected ? '' : 'ra');
          }

          if (type === 'first') {
            return 'Első oldalra';
          }

          if (type === 'last') {
            return 'Utolsó oldalra';
          }

          if (type === 'next') {
            return 'Következő oldalra';
          } // if (type === 'previous') {


          return 'Előző oldalra';
        }
      }
    }
  }
};
export var hyAM = {
  components: {
    // MuiBreadcrumbs: {
    //   defaultProps: {
    //     expandText: 'Show path',
    //   },
    // },
    MuiTablePagination: {
      defaultProps: {
        // getItemAriaLabel: (type) => {
        //   if (type === 'first') {
        //     return 'Go to first page';
        //   }
        //   if (type === 'last') {
        //     return 'Go to last page';
        //   }
        //   if (type === 'next') {
        //     return 'Go to next page';
        //   }
        //   // if (type === 'previous') {
        //   return 'Go to previous page';
        // },
        labelRowsPerPage: 'Տողեր մեկ էջում`' // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} / ${count !== -1 ? count : `more than ${to}`}`,

      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " \u0531\u057D\u057F\u0572");
        },
        emptyLabelText: 'Դատարկ'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Մաքրել',
        closeText: 'Փակել',
        loadingText: 'Բեռնում…',
        noOptionsText: 'Տարբերակներ չկան',
        openText: 'Բացել'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Փակել'
      }
    } // MuiPagination: {
    //   defaultProps: {
    //     'aria-label': 'Pagination navigation',
    //     getItemAriaLabel: (type, page, selected) => {
    //       if (type === 'page') {
    //         return `${selected ? '' : 'Go to '}page ${page}`;
    //       }
    //       if (type === 'first') {
    //         return 'Go to first page';
    //       }
    //       if (type === 'last') {
    //         return 'Go to last page';
    //       }
    //       if (type === 'next') {
    //         return 'Go to next page';
    //       }
    //       // if (type === 'previous') {
    //       return 'Go to previous page';
    //     },
    //   },
    // },

  }
};
export var idID = {
  components: {
    // MuiBreadcrumbs: {
    //   defaultProps: {
    //     expandText: 'Show path',
    //   },
    // },
    MuiTablePagination: {
      defaultProps: {
        // getItemAriaLabel: (type) => {
        //   if (type === 'first') {
        //     return 'Go to first page';
        //   }
        //   if (type === 'last') {
        //     return 'Go to last page';
        //   }
        //   if (type === 'next') {
        //     return 'Go to next page';
        //   }
        //   // if (type === 'previous') {
        //   return 'Go to previous page';
        // },
        labelRowsPerPage: 'Baris per halaman:' // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} dari ${count !== -1 ? count : `more than ${to}`}`,

      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " Bintang");
        } // emptyLabelText: 'Empty',

      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Hapus',
        closeText: 'Tutup',
        loadingText: 'Memuat…',
        noOptionsText: 'Tidak ada opsi',
        openText: 'Buka'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Tutup'
      }
    } // MuiPagination: {
    //   defaultProps: {
    //     'aria-label': 'Pagination navigation',
    //     getItemAriaLabel: (type, page, selected) => {
    //       if (type === 'page') {
    //         return `${selected ? '' : 'Go to '}page ${page}`;
    //       }
    //       if (type === 'first') {
    //         return 'Go to first page';
    //       }
    //       if (type === 'last') {
    //         return 'Go to last page';
    //       }
    //       if (type === 'next') {
    //         return 'Go to next page';
    //       }
    //       // if (type === 'previous') {
    //       return 'Go to previous page';
    //     },
    //   },
    // },

  }
};
export var isIS = {
  components: {
    // MuiBreadcrumbs: {
    //   defaultProps: {
    //    expandText: 'Show path',
    //   },
    // },
    MuiTablePagination: {
      defaultProps: {
        // getItemAriaLabel: (type) => {
        //   if (type === 'first') {
        //     return 'Go to first page';
        //   }
        //   if (type === 'last') {
        //     return 'Go to last page';
        //   }
        //   if (type === 'next') {
        //     return 'Go to next page';
        //   }
        //   // if (type === 'previous') {
        //   return 'Go to previous page';
        // },
        labelRowsPerPage: 'Raðir á síðu:' // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} af ${count !== -1 ? count : `more than ${to}`}`,

      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " ").concat(value === 1 ? 'Stjarna' : 'Stjörnur');
        },
        emptyLabelText: 'Tómt'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Hreinsa',
        closeText: 'Loka',
        loadingText: 'Hlaða…',
        noOptionsText: 'Engar niðurstöður',
        openText: 'Opna'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Loka'
      }
    } // MuiPagination: {
    //   defaultProps: {
    //     'aria-label': 'Pagination navigation',
    //     getItemAriaLabel: (type, page, selected) => {
    //       if (type === 'page') {
    //         return `${selected ? '' : 'Go to '}page ${page}`;
    //       }
    //       if (type === 'first') {
    //         return 'Go to first page';
    //       }
    //       if (type === 'last') {
    //         return 'Go to last page';
    //       }
    //       if (type === 'next') {
    //         return 'Go to next page';
    //       }
    //       // if (type === 'previous') {
    //       return 'Go to previous page';
    //     },
    //   },
    // },

  }
};
export var itIT = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Visualizza percorso'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'Vai alla prima pagina';
          }

          if (type === 'last') {
            return "Vai all'ultima pagina";
          }

          if (type === 'next') {
            return 'Vai alla pagina successiva';
          } // if (type === 'previous') {


          return 'Vai alla pagina precedente';
        },
        labelRowsPerPage: 'Righe per pagina:' // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} di ${count !== -1 ? count : `more than ${to}`}`,

      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " Stell").concat(value !== 1 ? 'e' : 'a');
        },
        emptyLabelText: 'Vuoto'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Svuota',
        closeText: 'Chiudi',
        loadingText: 'Caricamento in corso…',
        noOptionsText: 'Nessuna opzione',
        openText: 'Apri'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Chiudi'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigazione impaginata',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "".concat(selected ? '' : 'Vai alla ', "pagina ").concat(page);
          }

          if (type === 'first') {
            return 'Vai alla prima pagina';
          }

          if (type === 'last') {
            return "Vai all'ultima pagina";
          }

          if (type === 'next') {
            return 'Vai alla pagina successiva';
          } // if (type === 'previous') {


          return 'Vai alla pagina precedente';
        }
      }
    }
  }
};
export var jaJP = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'すべて表示'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return '最初のページへ';
          }

          if (type === 'last') {
            return '最後のページへ';
          }

          if (type === 'next') {
            return '次のページへ';
          } // if (type === 'previous') {


          return '前のページへ';
        },
        labelRowsPerPage: 'ページあたりの行数:',
        labelDisplayedRows: function labelDisplayedRows(_ref10) {
          var from = _ref10.from,
              to = _ref10.to,
              count = _ref10.count;
          return "".concat(from, "\uFF5E").concat(to, " / ").concat(count !== -1 ? count : "".concat(to, "\u4EE5\u4E0A"));
        }
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "\u661F".concat(value);
        },
        emptyLabelText: '星なし'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'クリア',
        closeText: '閉じる',
        loadingText: '読み込み中…',
        noOptionsText: 'データがありません',
        openText: '開く'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: '閉じる'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'ページ選択',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "\u30DA\u30FC\u30B8".concat(page).concat(selected ? '' : 'へ');
          }

          if (type === 'first') {
            return '最初のページへ';
          }

          if (type === 'last') {
            return '最後のページへ';
          }

          if (type === 'next') {
            return '次のページへ';
          } // if (type === 'previous') {


          return '前のページへ';
        }
      }
    }
  }
};
export var koKR = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: '경로 보기'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return '첫 번째 페이지로 이동';
          }

          if (type === 'last') {
            return '마지막 페이지로 이동';
          }

          if (type === 'next') {
            return '다음 페이지로 이동';
          } // if (type === 'previous') {


          return '이전 페이지로 이동';
        },
        labelRowsPerPage: '페이지 당 행:',
        labelDisplayedRows: function labelDisplayedRows(_ref11) {
          var from = _ref11.from,
              to = _ref11.to,
              count = _ref11.count;
          return "".concat(from, "-").concat(to, " / ").concat(count !== -1 ? count : "".concat(to, "\uAC1C \uC774\uC0C1"));
        }
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " \uC810");
        },
        emptyLabelText: '빈 텍스트'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: '지우기',
        closeText: '닫기',
        loadingText: '불러오는 중…',
        noOptionsText: '옵션 없음',
        openText: '열기'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: '닫기'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': '페이지네이션 네비게이션',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "".concat(page, " \uBC88\uC9F8 \uD398\uC774\uC9C0").concat(selected ? '' : '로 이동');
          }

          if (type === 'first') {
            return '첫 번째 페이지로 이동';
          }

          if (type === 'last') {
            return '마지막 페이지로 이동';
          }

          if (type === 'next') {
            return '다음 페이지로 이동';
          } // if (type === 'previous') {


          return '이전 페이지로 이동';
        }
      }
    }
  }
};
export var kzKZ = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Толық жолды көрсету'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'Бірінші бетке өту';
          }

          if (type === 'last') {
            return 'Соңғы бетке өту';
          }

          if (type === 'next') {
            return 'Келесі бетке өту';
          } // if (type === 'previous') {


          return 'Алдыңғы бетке өту';
        },
        labelRowsPerPage: 'Беттегі қатарлар:',
        labelDisplayedRows: function labelDisplayedRows(_ref12) {
          var from = _ref12.from,
              to = _ref12.to,
              count = _ref12.count;
          return "".concat(count !== -1 ? count : "+".concat(to), " \u049B\u0430\u0442\u0430\u0440\u0434\u044B\u04A3 \u0456\u0448\u0456\u043D\u0435\u043D ").concat(from, "-").concat(to);
        }
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " \u0436\u04B1\u043B\u0434\u044B\u0437");
        },
        emptyLabelText: 'Рейтинг жоқ'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Тазарту',
        closeText: 'Жабу',
        loadingText: 'Жүктелуде…',
        noOptionsText: 'Қол жетімді нұсқалар жоқ',
        openText: 'Ашу'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Жабу'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Беттерді шарлау',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            if (selected) return "".concat(page, " \u2014 \u0431\u0435\u0442");
            return "".concat(page, " \u2014 \u0431\u0435\u0442\u043A\u0435 \u04E9\u0442\u0443");
          }

          if (type === 'first') {
            return 'Бірінші бетке өту';
          }

          if (type === 'last') {
            return 'Соңғы бетке өту';
          }

          if (type === 'next') {
            return 'Келесі бетке өту';
          } // if (type === 'previous') {


          return 'Алдыңғы бетке өту';
        }
      }
    }
  }
};
export var nlNL = {
  components: {
    // MuiBreadcrumbs: {
    //   defaultProps: {
    //     expandText: 'Show path',
    //   },
    // },
    MuiTablePagination: {
      defaultProps: {
        // getItemAriaLabel: (type) => {
        //   if (type === 'first') {
        //     return 'Go to first page';
        //   }
        //   if (type === 'last') {
        //     return 'Go to last page';
        //   }
        //   if (type === 'next') {
        //     return 'Go to next page';
        //   }
        //   // if (type === 'previous') {
        //   return 'Go to previous page';
        // },
        labelRowsPerPage: 'Regels per pagina :' // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} van ${count !== -1 ? count : `more than ${to}`}`,

      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " Ster").concat(value !== 1 ? 'ren' : '');
        } // emptyLabelText: 'Empty',

      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Wissen',
        closeText: 'Sluiten',
        loadingText: 'Laden…',
        noOptionsText: 'Geen opties',
        openText: 'Openen'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Sluiten'
      }
    } // MuiPagination: {
    //   defaultProps: {
    //     'aria-label': 'Pagination navigation',
    //     getItemAriaLabel: (type, page, selected) => {
    //       if (type === 'page') {
    //         return `${selected ? '' : 'Go to '}page ${page}`;
    //       }
    //       if (type === 'first') {
    //         return 'Go to first page';
    //       }
    //       if (type === 'last') {
    //         return 'Go to last page';
    //       }
    //       if (type === 'next') {
    //         return 'Go to next page';
    //       }
    //       // if (type === 'previous') {
    //       return 'Go to previous page';
    //     },
    //   },
    // },

  }
};
export var plPL = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Pokaż ścieżkę'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'Przejdź do pierwszej strony';
          }

          if (type === 'last') {
            return 'Przejdź do ostatniej strony';
          }

          if (type === 'next') {
            return 'Przejdź do następnej strony';
          } // if (type === 'previous') {


          return 'Przejdź do poprzedniej strony';
        },
        labelRowsPerPage: 'Wierszy na stronę:' // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} z ${count !== -1 ? count : `more than ${to}`}`,

      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          var pluralForm = 'gwiazdek';
          var lastDigit = value % 10;

          if ((value < 10 || value > 20) && lastDigit > 1 && lastDigit < 5) {
            pluralForm = 'gwiazdki';
          } else if (value === 1) {
            pluralForm = 'gwiazdka';
          }

          return "".concat(value, " ").concat(pluralForm);
        },
        emptyLabelText: 'Brak gwiazdek'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Wyczyść',
        closeText: 'Zamknij',
        loadingText: 'Ładowanie…',
        noOptionsText: 'Brak opcji',
        openText: 'Otwórz'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Zamknij'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Nawigacja podziału na strony',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return selected ? "".concat(page, ". strona") : "Przejd\u017A do ".concat(page, ". strony");
          }

          if (type === 'first') {
            return 'Przejdź do pierwszej strony';
          }

          if (type === 'last') {
            return 'Przejdź do ostatniej strony';
          }

          if (type === 'next') {
            return 'Przejdź do następnej strony';
          } // if (type === 'previous') {


          return 'Przejdź do poprzedniej strony';
        }
      }
    }
  }
};
export var ptBR = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Mostrar caminho'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'Ir para a primeira página';
          }

          if (type === 'last') {
            return 'Ir para a última página';
          }

          if (type === 'next') {
            return 'Ir para a próxima página';
          } // if (type === 'previous') {


          return 'Ir para a página anterior';
        },
        labelRowsPerPage: 'Linhas por página:',
        labelDisplayedRows: function labelDisplayedRows(_ref13) {
          var from = _ref13.from,
              to = _ref13.to,
              count = _ref13.count;
          return "".concat(from, "-").concat(to, " de ").concat(count !== -1 ? count : "mais de ".concat(to));
        }
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " Estrela").concat(value !== 1 ? 's' : '');
        },
        emptyLabelText: 'Vazio'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Limpar',
        closeText: 'Fechar',
        loadingText: 'Carregando…',
        noOptionsText: 'Sem opções',
        openText: 'Abrir'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Fechar'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navegar pela paginação',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "".concat(selected ? '' : 'Ir para a ', "p\xE1gina ").concat(page);
          }

          if (type === 'first') {
            return 'Ir para a primeira página';
          }

          if (type === 'last') {
            return 'Ir para a última página';
          }

          if (type === 'next') {
            return 'Ir para a próxima página';
          } // if (type === 'previous') {


          return 'Ir para a página anterior';
        }
      }
    }
  }
};
export var ptPT = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Mostrar caminho'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'Primeira página';
          }

          if (type === 'last') {
            return 'Última página';
          }

          if (type === 'next') {
            return 'Próxima página';
          } // if (type === 'previous') {


          return 'Página anterior';
        },
        labelRowsPerPage: 'Linhas por página:',
        labelDisplayedRows: function labelDisplayedRows(_ref14) {
          var from = _ref14.from,
              to = _ref14.to,
              count = _ref14.count;
          return "".concat(from, "-").concat(to, " de ").concat(count !== -1 ? count : "mais de ".concat(to));
        }
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " Estrela").concat(value !== 1 ? 's' : '');
        },
        emptyLabelText: 'Vazio'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Limpar',
        closeText: 'Fechar',
        loadingText: 'A carregar…',
        noOptionsText: 'Sem opções',
        openText: 'Abrir'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Fechar'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navegar por páginas',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "".concat(selected ? '' : 'Ir para a ', "p\xE1gina ").concat(page);
          }

          if (type === 'first') {
            return 'Primeira página';
          }

          if (type === 'last') {
            return 'Última página';
          }

          if (type === 'next') {
            return 'Próxima página';
          } // if (type === 'previous') {


          return 'Página anterior';
        }
      }
    }
  }
};
export var roRO = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Arată calea'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'Mergi la prima pagină';
          }

          if (type === 'last') {
            return 'Mergi la ultima pagină';
          }

          if (type === 'next') {
            return 'Mergi la pagina următoare';
          } // if (type === 'previous') {


          return 'Mergi la pagina precedentă';
        },
        labelRowsPerPage: 'Rânduri pe pagină:' // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} din ${count !== -1 ? count : `more than ${to}`}`,

      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " St").concat(value !== 1 ? 'ele' : 'ea');
        },
        emptyLabelText: 'Gol'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Șterge',
        closeText: 'Închide',
        loadingText: 'Se încarcă…',
        noOptionsText: 'Nicio opțiune',
        openText: 'Deschide'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Închide'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigare prin paginare',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "".concat(selected ? '' : 'Mergi la ', "pagina ").concat(page);
          }

          if (type === 'first') {
            return 'Mergi la prima pagină';
          }

          if (type === 'last') {
            return 'Mergi la ultima pagină';
          }

          if (type === 'next') {
            return 'Mergi la pagina următoare';
          } // if (type === 'previous') {


          return 'Mergi la pagina precedentă';
        }
      }
    }
  }
};
export var ruRU = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Показать полный путь'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'Перейти на первую страницу';
          }

          if (type === 'last') {
            return 'Перейти на последнюю страницу';
          }

          if (type === 'next') {
            return 'Перейти на следующую страницу';
          } // if (type === 'previous') {


          return 'Перейти на предыдущую страницу';
        },
        labelRowsPerPage: 'Строк на странице:',
        labelDisplayedRows: function labelDisplayedRows(_ref15) {
          var from = _ref15.from,
              to = _ref15.to,
              count = _ref15.count;
          return "".concat(from, "-").concat(to, " \u0438\u0437 ").concat(count !== -1 ? count : "\u0431\u043E\u043B\u0435\u0435 \u0447\u0435\u043C ".concat(to));
        }
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          var pluralForm = 'Звёзд';
          var lastDigit = value % 10;

          if (lastDigit > 1 && lastDigit < 5) {
            pluralForm = 'Звезды';
          } else if (lastDigit === 1) {
            pluralForm = 'Звезда';
          }

          return "".concat(value, " ").concat(pluralForm);
        },
        emptyLabelText: 'Рейтинг отсутствует'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Очистить',
        closeText: 'Закрыть',
        loadingText: 'Загрузка…',
        noOptionsText: 'Нет доступных вариантов',
        openText: 'Открыть'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Закрыть'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Навигация по страницам',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            if (selected) return "".concat(page, " \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430");
            return "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043D\u0430 ".concat(page, " \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443");
          }

          if (type === 'first') {
            return 'Перейти на первую страницу';
          }

          if (type === 'last') {
            return 'Перейти на последнюю страницу';
          }

          if (type === 'next') {
            return 'Перейти на следующую страницу';
          } // if (type === 'previous') {


          return 'Перейти на предыдущую страницу';
        }
      }
    }
  }
};
export var siLK = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'ගමන් මඟ පෙන්වන්න'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'පළමු පිටුවට යන්න';
          }

          if (type === 'last') {
            return 'අවසාන පිටුවට යන්න';
          }

          if (type === 'next') {
            return 'මීළඟ පිටුවට යන්න';
          } // if (type === 'previous') {


          return 'පෙර පිටුවට යන්න';
        },
        labelRowsPerPage: 'පිටුවක පේළි:',
        labelDisplayedRows: function labelDisplayedRows(_ref16) {
          var from = _ref16.from,
              to = _ref16.to,
              count = _ref16.count;
          return "".concat(from, "-").concat(to, " \u0DAF\u0D9A\u0DCA\u0DC0\u0DCF ").concat(count !== -1 ? count : "".concat(to, " \u0DA7 \u0DC0\u0DD0\u0DA9\u0DD2 \u0DB4\u0DCA\u200D\u0DBB\u0DB8\u0DCF\u0DAB\u0DBA\u0D9A\u0DD2\u0DB1\u0DCA"));
        }
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "\u0DAD\u0DBB\u0DD4 ".concat(value);
        },
        emptyLabelText: 'හිස්'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'මකන්න',
        closeText: 'වසන්න',
        loadingText: 'නැංවෙමින්…',
        noOptionsText: 'විකල්ප නැත',
        openText: 'විවෘත කරන්න'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'වසන්න'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'පිටු අතර සංචරණය',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "\u0DB4\u0DD2\u0DA7\u0DD4\u0DC0 ".concat(page, " ").concat(selected ? '' : 'ට යන්න');
          }

          if (type === 'first') {
            return 'පළමු පිටුවට යන්න';
          }

          if (type === 'last') {
            return 'අවසාන පිටුවට යන්න';
          }

          if (type === 'next') {
            return 'මීළඟ පිටුවට යන්න';
          } // if (type === 'previous') {


          return 'පෙර පිටුවට යන්න';
        }
      }
    }
  }
};
export var skSK = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Ukázať cestu '
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'Ísť na prvú stránku';
          }

          if (type === 'last') {
            return 'Ísť na poslednú stránku';
          }

          if (type === 'next') {
            return 'Ísť na ďaľšiu stránku';
          } // if (type === 'previous') {


          return 'Ísť na predchádzajúcu stránku';
        },
        labelRowsPerPage: 'Riadkov na stránke:',
        labelDisplayedRows: function labelDisplayedRows(_ref17) {
          var from = _ref17.from,
              to = _ref17.to,
              count = _ref17.count;
          return "".concat(from, "-").concat(to, " z ").concat(count !== -1 ? count : "viac ako ".concat(to));
        }
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          if (value === 1) {
            return "".concat(value, " hviezdi\u010Dka");
          }

          if (value >= 2 && value <= 4) {
            return "".concat(value, " hviezdi\u010Dky");
          }

          return "".concat(value, " hviezdi\u010Diek");
        },
        emptyLabelText: 'Prázdne'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Vymazať',
        closeText: 'Zavrieť',
        loadingText: 'Načítanie…',
        noOptionsText: 'Žiadne možnosti',
        openText: 'Otvoriť'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Zavrieť'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigácia stránkovanim',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "".concat(selected ? '' : 'Ísť na ', "str\xE1nku ").concat(page);
          }

          if (type === 'first') {
            return 'Ísť na prvú stránku';
          }

          if (type === 'last') {
            return 'Ísť na poslednú stránku';
          }

          if (type === 'next') {
            return 'Ísť na ďaľšiu stránku';
          } // if (type === 'previous') {


          return 'Ísť na predchádzajúcu stránku';
        }
      }
    }
  }
};
export var svSE = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Visa sökväg'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'Gå till första sidan';
          }

          if (type === 'last') {
            return 'Gå till sista sidan';
          }

          if (type === 'next') {
            return 'Gå till nästa sida';
          } // if (type === 'previous') {


          return 'Gå till föregående sida';
        },
        labelRowsPerPage: 'Rader per sida:',
        labelDisplayedRows: function labelDisplayedRows(_ref18) {
          var from = _ref18.from,
              to = _ref18.to,
              count = _ref18.count;
          return "".concat(from, "-").concat(to, " av ").concat(count !== -1 ? count : "fler \xE4n ".concat(to));
        }
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " ").concat(value !== 1 ? 'Stjärnor' : 'Stjärna');
        },
        emptyLabelText: 'Tom'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Rensa',
        closeText: 'Stäng',
        loadingText: 'Laddar…',
        noOptionsText: 'Inga alternativ',
        openText: 'Öppna'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Stäng'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Sidnavigering',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "".concat(selected ? '' : 'Gå till ', "sida ").concat(page);
          }

          if (type === 'first') {
            return 'Gå till första sidan';
          }

          if (type === 'last') {
            return 'Gå till sista sidan';
          }

          if (type === 'next') {
            return 'Gå till nästa sida';
          } // if (type === 'previous') {


          return 'Gå till föregående sida';
        }
      }
    }
  }
};
export var thTH = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'แสดงเส้นทาง'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'ไปที่หน้าแรก';
          }

          if (type === 'last') {
            return 'ไปที่หน้าสุดท้าย';
          }

          if (type === 'next') {
            return 'ไปที่หน้าถัดไป';
          } // if (type === 'previous') {


          return 'ไปที่หน้าก่อน';
        },
        labelRowsPerPage: 'จำนวนแถวต่อหน้า:',
        labelDisplayedRows: function labelDisplayedRows(_ref19) {
          var from = _ref19.from,
              to = _ref19.to,
              count = _ref19.count;
          return "".concat(from, "-").concat(to, " \u0E08\u0E32\u0E01 ").concat(count !== -1 ? count : "\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32 ".concat(to));
        }
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " \u0E14\u0E32\u0E27");
        },
        emptyLabelText: 'ว่างเปล่า'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'เคลียร์',
        closeText: 'ปิด',
        loadingText: 'กำลังโหลด…',
        noOptionsText: 'ไม่มีตัวเลือก',
        openText: 'เปิด'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'ปิด'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': '',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "".concat(selected ? '' : 'ไปที่', "\u0E2B\u0E19\u0E49\u0E32 ").concat(page);
          }

          if (type === 'first') {
            return 'ไปที่หน้าแรก';
          }

          if (type === 'last') {
            return 'ไปที่หน้าสุดท้าย';
          }

          if (type === 'next') {
            return 'ไปที่หน้าถัดไป';
          } // if (type === 'previous') {


          return 'ไปที่หน้าก่อน';
        }
      }
    }
  }
};
export var trTR = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Yolu göster'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'İlk sayfaya git';
          }

          if (type === 'last') {
            return 'Son sayfaya git';
          }

          if (type === 'next') {
            return 'Sonraki sayfaya git';
          } // if (type === 'previous') {


          return 'Önceki sayfaya git';
        },
        labelRowsPerPage: 'Sayfa başına satır:' // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} tanesinden ${count !== -1 ? count : `more than ${to}`}`,

      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " Y\u0131ld\u0131z");
        },
        emptyLabelText: 'Boş'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Temizle',
        closeText: 'Kapat',
        loadingText: 'Yükleniyor…',
        noOptionsText: 'Seçenek yok',
        openText: 'Aç'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Kapat'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Sayfa navigasyonu',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "".concat(page, ". ").concat(selected ? 'sayfa' : 'sayfaya git');
          }

          if (type === 'first') {
            return 'İlk sayfaya git';
          }

          if (type === 'last') {
            return 'Son sayfaya git';
          }

          if (type === 'next') {
            return 'Sonraki sayfaya git';
          } // if (type === 'previous') {


          return 'Önceki sayfaya git';
        }
      }
    }
  }
};
export var ukUA = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Показати шлях сторінок'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return 'Перейти на першу сторінку';
          }

          if (type === 'last') {
            return 'Перейти на останню сторінку';
          }

          if (type === 'next') {
            return 'Перейти на наступну сторінку';
          } // if (type === 'previous') {


          return 'Перейти на попередню сторінку';
        },
        labelRowsPerPage: 'Рядків на сторінці:',
        labelDisplayedRows: function labelDisplayedRows(_ref20) {
          var from = _ref20.from,
              to = _ref20.to,
              count = _ref20.count;
          return "".concat(from, "-").concat(to, " \u0437 ").concat(count !== -1 ? count : "\u043F\u043E\u043D\u0430\u0434 ".concat(to));
        }
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          var pluralForm = 'Зірок';
          var lastDigit = value % 10;

          if (lastDigit > 1 && lastDigit < 5) {
            pluralForm = 'Зірки';
          } else if (lastDigit === 1) {
            pluralForm = 'Зірка';
          }

          return "".concat(value, " ").concat(pluralForm);
        },
        emptyLabelText: 'Рейтинг відсутній'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Очистити',
        closeText: 'Згорнути',
        loadingText: 'Завантаження…',
        noOptionsText: 'Немає варіантів',
        openText: 'Розгорнути'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Згорнути'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Навігація сторінками',
        getItemAriaLabel: function getItemAriaLabel(type, page, selected) {
          if (type === 'page') {
            return "".concat(selected ? '' : 'Перейти на ', "\u0441\u0442\u043E\u0440\u0456\u043D\u043A\u0443 ").concat(page);
          }

          if (type === 'first') {
            return 'Перейти на першу сторінку';
          }

          if (type === 'last') {
            return 'Перейти на останню сторінку';
          }

          if (type === 'next') {
            return 'Перейти на наступну сторінку';
          } // if (type === 'previous') {


          return 'Перейти на попередню сторінку';
        }
      }
    }
  }
};
export var viVN = {
  components: {
    // MuiBreadcrumbs: {
    //   defaultProps: {
    //     expandText: 'Show path',
    //   },
    // },
    MuiTablePagination: {
      defaultProps: {
        // getItemAriaLabel: (type) => {
        //   if (type === 'first') {
        //     return 'Go to first page';
        //   }
        //   if (type === 'last') {
        //     return 'Go to last page';
        //   }
        //   if (type === 'next') {
        //     return 'Go to next page';
        //   }
        //   // if (type === 'previous') {
        //   return 'Go to previous page';
        // },
        labelRowsPerPage: 'Số hàng mỗi trang:',
        labelDisplayedRows: function labelDisplayedRows(_ref21) {
          var from = _ref21.from,
              to = _ref21.to,
              count = _ref21.count;
          return "".concat(from, "-").concat(to, " trong ").concat(count !== -1 ? count : "nhi\u1EC1u h\u01A1n ".concat(to));
        }
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " sao");
        },
        emptyLabelText: 'Trống'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Xóa',
        closeText: 'Đóng',
        loadingText: 'Đang tải…',
        noOptionsText: 'Không có lựa chọn',
        openText: 'Mở'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Đóng'
      }
    } // MuiPagination: {
    //   defaultProps: {
    //     'aria-label': 'Pagination navigation',
    //     getItemAriaLabel: (type, page, selected) => {
    //       if (type === 'page') {
    //         return `${selected ? '' : 'Go to '}page ${page}`;
    //       }
    //       if (type === 'first') {
    //         return 'Go to first page';
    //       }
    //       if (type === 'last') {
    //         return 'Go to last page';
    //       }
    //       if (type === 'next') {
    //         return 'Go to next page';
    //       }
    //       // if (type === 'previous') {
    //       return 'Go to previous page';
    //     },
    //   },
    // },

  }
};
export var zhCN = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: '展开'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return '第一页';
          }

          if (type === 'last') {
            return '最后一页';
          }

          if (type === 'next') {
            return '下一页';
          }

          return '上一页';
        },
        labelRowsPerPage: '每页行数:',
        labelDisplayedRows: function labelDisplayedRows(_ref22) {
          var from = _ref22.from,
              to = _ref22.to,
              count = _ref22.count;
          return "\u7B2C ".concat(from, " \u6761\u5230\u7B2C ").concat(to, " \u6761\uFF0C").concat(count !== -1 ? "\u5171 ".concat(count, " \u6761") : "\u81F3\u5C11 ".concat(to, " \u6761"));
        }
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " \u9897\u661F");
        },
        emptyLabelText: '无标签'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: '清空',
        closeText: '关闭',
        loadingText: '加载中……',
        noOptionsText: '没有可用选项',
        openText: '打开'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: '关闭'
      }
    }
  }
};
export var zhHK = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: '展開'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return '第一頁';
          }

          if (type === 'last') {
            return '最後一頁';
          }

          if (type === 'next') {
            return '下一頁';
          }

          return '上一頁';
        },
        labelRowsPerPage: '每頁行數:',
        labelDisplayedRows: function labelDisplayedRows(_ref23) {
          var from = _ref23.from,
              to = _ref23.to,
              count = _ref23.count;
          return "\u7B2C ".concat(from, " \u9805\u81F3\u7B2C ").concat(to, " \u9805\uFF0C").concat(count !== -1 ? "\u5171 ".concat(count, " \u9805") : "\u8D85\u904E ".concat(to, " \u9805"));
        }
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " \u7C92\u661F");
        },
        emptyLabelText: '無標籤'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: '清除',
        closeText: '關閉',
        loadingText: '載入中……',
        noOptionsText: '沒有可用選項',
        openText: '開啟'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: '關閉'
      }
    }
  }
};
export var zhTW = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: '展開'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: function getItemAriaLabel(type) {
          if (type === 'first') {
            return '第一頁';
          }

          if (type === 'last') {
            return '最後一頁';
          }

          if (type === 'next') {
            return '下一頁';
          }

          return '上一頁';
        },
        labelRowsPerPage: '每行行數:',
        labelDisplayedRows: function labelDisplayedRows(_ref24) {
          var from = _ref24.from,
              to = _ref24.to,
              count = _ref24.count;
          return "\u7B2C ".concat(from, " \u689D\u5230\u7B2C ").concat(to, " \u689D\uFF0C").concat(count !== -1 ? "\u5171 ".concat(count, " \u689D") : "\u81F3\u5C11 ".concat(to, " \u689D"));
        }
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: function getLabelText(value) {
          return "".concat(value, " \u9846\u661F");
        },
        emptyLabelText: '無標簽'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: '清空',
        closeText: '關閉',
        loadingText: '載入中……',
        noOptionsText: '没有可用選項',
        openText: '打開'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: '關閉'
      }
    }
  }
};