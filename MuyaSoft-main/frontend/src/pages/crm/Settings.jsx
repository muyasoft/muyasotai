import React from 'react';
import { Save, Upload } from 'lucide-react';
import Header from '../../components/crm/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { useToast } from '../../hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Ayarlar kaydedildi!",
      description: "Tüm ayarlar başarıyla güncellendi.",
    });
  };

  return (
    <div className="flex-1 overflow-auto">
      <Header 
        title="Ayarlar" 
        subtitle="Sistem ayarları ve yapılandırma"
      />
      
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ses Codec Ayarları */}
          <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
            <CardHeader>
              <CardTitle className="text-white">Ses Codec Ayarları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-[rgb(161,161,170)] mb-2 block">Varsayılan Codec</Label>
                <Select>
                  <SelectTrigger className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white">
                    <SelectValue placeholder="Codec seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)]">
                    <SelectItem value="g729">G729</SelectItem>
                    <SelectItem value="g711">G711</SelectItem>
                    <SelectItem value="opus">OPUS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-[rgb(161,161,170)] mb-2 block">Ses Kalitesi</Label>
                <Select>
                  <SelectTrigger className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white">
                    <SelectValue placeholder="Kalite seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)]">
                    <SelectItem value="high">Yüksek</SelectItem>
                    <SelectItem value="medium">Orta</SelectItem>
                    <SelectItem value="low">Düşük</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Güvenlik & Erişim */}
          <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
            <CardHeader>
              <CardTitle className="text-white">Güvenlik & Erişim Yönetimi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-[rgb(161,161,170)] mb-2 block">2FA (İki Faktörlü Doğrulama)</Label>
                <Select>
                  <SelectTrigger className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white">
                    <SelectValue placeholder="Durum seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)]">
                    <SelectItem value="enabled">Aktif</SelectItem>
                    <SelectItem value="disabled">Pasif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-[rgb(161,161,170)] mb-2 block">Oturum Zaman Aşımı (dakika)</Label>
                <Input
                  type="number"
                  placeholder="30"
                  className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Zaman Dilimi */}
          <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
            <CardHeader>
              <CardTitle className="text-white">Zaman Dilimi Seçimi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-[rgb(161,161,170)] mb-2 block">Zaman Dilimi</Label>
                <Select>
                  <SelectTrigger className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white">
                    <SelectValue placeholder="Zaman dilimi seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)]">
                    <SelectItem value="europe/istanbul">Europe/Istanbul (GMT+3)</SelectItem>
                    <SelectItem value="europe/london">Europe/London (GMT+0)</SelectItem>
                    <SelectItem value="america/new_york">America/New_York (GMT-5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-[rgb(161,161,170)] mb-2 block">Tarih Formatı</Label>
                <Select>
                  <SelectTrigger className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white">
                    <SelectValue placeholder="Format seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)]">
                    <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                    <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* SMTP Ayarları */}
          <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
            <CardHeader>
              <CardTitle className="text-white">SMTP Ayarları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-[rgb(161,161,170)] mb-2 block">SMTP Sunucusu</Label>
                <Input
                  placeholder="smtp.gmail.com"
                  className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
                />
              </div>
              <div>
                <Label className="text-[rgb(161,161,170)] mb-2 block">Port</Label>
                <Input
                  placeholder="587"
                  className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
                />
              </div>
              <div>
                <Label className="text-[rgb(161,161,170)] mb-2 block">E-posta</Label>
                <Input
                  placeholder="info@muyasoftai.com"
                  className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Tema & Dil */}
          <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
            <CardHeader>
              <CardTitle className="text-white">Tema & Dil Ayarı</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-[rgb(161,161,170)] mb-2 block">Tema</Label>
                <Select>
                  <SelectTrigger className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white">
                    <SelectValue placeholder="Tema seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)]">
                    <SelectItem value="dark">Koyu Tema</SelectItem>
                    <SelectItem value="light">Açık Tema</SelectItem>
                    <SelectItem value="auto">Otomatik</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-[rgb(161,161,170)] mb-2 block">Dil</Label>
                <Select>
                  <SelectTrigger className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white">
                    <SelectValue placeholder="Dil seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)]">
                    <SelectItem value="tr">Türkçe</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Kullanıcı Yönetimi */}
          <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
            <CardHeader>
              <CardTitle className="text-white">Kullanıcı Yönetimi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-[rgb(161,161,170)] mb-2 block">Profil Fotoğrafı</Label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                    A
                  </div>
                  <Button variant="outline" className="border-[rgb(63,63,63)] text-white hover:bg-[rgb(38,40,42)]">
                    <Upload size={16} className="mr-2" />
                    Fotoğraf Yükle
                  </Button>
                </div>
              </div>
              <div>
                <Label className="text-[rgb(161,161,170)] mb-2 block">Kullanıcı Adı</Label>
                <Input
                  placeholder="Admin User"
                  className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
                />
              </div>
              <div>
                <Label className="text-[rgb(161,161,170)] mb-2 block">E-posta</Label>
                <Input
                  placeholder="admin@muyasoftai.com"
                  className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <Button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg"
            onClick={handleSave}
          >
            <Save size={20} className="mr-2" />
            Ayarları Kaydet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;