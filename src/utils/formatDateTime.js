export function formatDateTime(dateTimeString, locale = 'en-EN') {
    // Tarih string'ini parse et
    const date = new Date(dateTimeString);
  
    // Kullanıcı dostu bir format oluştur
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    };
  
    // Belirtilen locale ve seçeneklerle tarihi formatla
    return new Intl.DateTimeFormat(locale, options).format(date);
  }

  