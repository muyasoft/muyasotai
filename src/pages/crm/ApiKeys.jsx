import React, { useState } from 'react';
import { Plus, Copy, Eye, EyeOff, Trash2, RefreshCw } from 'lucide-react';
import Header from '../../components/crm/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { apiKeys } from '../../data/crmMock';
import { useToast } from '../../hooks/use-toast';

const ApiKeys = () => {
  const { toast } = useToast();
  const [keys] = useState(apiKeys);
  const [visibleKeys, setVisibleKeys] = useState({});

  const toggleKeyVisibility = (id) => {
    setVisibleKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Kopyalandı!",
      description: "API anahtarı panonuza kopyalandı.",
    });
  };

  const maskKey = (key) => {
    return key.slice(0, 12) + '...' + key.slice(-6);
  };

  return (
    <div className="flex-1 overflow-auto">
      <Header 
        title="API Anahtarları" 
        subtitle="API key oluşturma, yönetimi ve webhook ayarları"
      />
      
      <div className="p-8">
        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            <Plus size={18} className="mr-2" />
            Yeni API Key Oluştur
          </Button>
        </div>

        {/* API Keys List */}
        <div className="space-y-6">
          {keys.map((apiKey) => (
            <Card key={apiKey.id} className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-xl mb-2">{apiKey.name}</CardTitle>
                    <p className="text-sm text-[rgb(161,161,170)]">
                      Oluşturulma: {apiKey.created} | Son kullanım: {apiKey.lastUsed}
                    </p>
                  </div>
                  <Badge className={apiKey.status === 'active' 
                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                    : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                  }>
                    {apiKey.status === 'active' ? 'Aktif' : 'Pasif'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* API Key */}
                  <div>
                    <label className="text-sm text-[rgb(161,161,170)] mb-2 block">API Key</label>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={visibleKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                        readOnly
                        className="flex-1 bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white font-mono text-sm"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[rgb(63,63,63)] text-white hover:bg-[rgb(38,40,42)]"
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                      >
                        {visibleKeys[apiKey.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[rgb(63,63,63)] text-white hover:bg-blue-500/10 hover:border-blue-500"
                        onClick={() => copyToClipboard(apiKey.key)}
                      >
                        <Copy size={16} />
                      </Button>
                    </div>
                  </div>

                  {/* IP Whitelist */}
                  <div>
                    <label className="text-sm text-[rgb(161,161,170)] mb-2 block">IP Whitelist</label>
                    <div className="flex flex-wrap gap-2">
                      {apiKey.ipWhitelist.map((ip, index) => (
                        <Badge key={index} className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                          {ip}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Webhook URL */}
                  <div>
                    <label className="text-sm text-[rgb(161,161,170)] mb-2 block">Webhook URL (Opsiyonel)</label>
                    <Input
                      placeholder="https://your-domain.com/webhook"
                      className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
                    />
                  </div>

                  {/* Usage Limits */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-[rgb(161,161,170)] mb-2 block">Kullanım Limiti</label>
                      <Input
                        placeholder="1000 istek/saat"
                        className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-[rgb(161,161,170)] mb-2 block">Rate Limit</label>
                      <Input
                        placeholder="100 istek/dakika"
                        className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-4 border-t border-[rgba(255,255,255,0.1)]">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[rgb(63,63,63)] text-white hover:bg-blue-500/10 hover:border-blue-500"
                    >
                      <RefreshCw size={16} className="mr-2" />
                      Yenile
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[rgb(63,63,63)] text-red-400 hover:bg-red-500/10 hover:border-red-500"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Sil
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Example API Connection Info */}
        <Card className="mt-8 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-teal-500/10 border-[rgba(255,255,255,0.1)]">
          <CardHeader>
            <CardTitle className="text-white">Örnek API Bağlantı Bilgisi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[rgb(161,161,170)] mb-2">Base URL:</p>
                <code className="block bg-[rgb(38,40,42)] text-blue-400 p-3 rounded-lg font-mono text-sm">
                  https://api.muyasoftai.com/v1
                </code>
              </div>
              <div>
                <p className="text-sm text-[rgb(161,161,170)] mb-2">Örnek İstek:</p>
                <code className="block bg-[rgb(38,40,42)] text-green-400 p-3 rounded-lg font-mono text-sm whitespace-pre">
{`curl -X POST https://api.muyasoftai.com/v1/calls \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+90 532 123 4567",
    "campaign_id": "camp_123"
  }'`}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApiKeys;