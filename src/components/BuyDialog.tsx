import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Product, createOrder } from '@/lib/api';
import { toast } from 'sonner';

interface BuyDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

const BuyDialog = ({ product, open, onOpenChange }: BuyDialogProps) => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!product) return;
    const n = nickname.trim();
    if (n.length < 3 || n.length > 16) {
      toast.error('Ник должен быть от 3 до 16 символов');
      return;
    }
    setLoading(true);
    try {
      const res = await createOrder(n, product.slug, email.trim() || undefined);
      toast.success('Заказ создан! Открываем оплату...');
      setTimeout(() => {
        window.location.href = res.payment_url;
      }, 500);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Ошибка оплаты';
      toast.error(msg);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display font-black text-2xl">
            Покупка {product?.name}
          </DialogTitle>
          <DialogDescription>
            Введите ник в Minecraft — привилегия выдастся автоматически после оплаты.
          </DialogDescription>
        </DialogHeader>

        {product && (
          <div className="space-y-5 pt-2">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/50 border border-border">
              <div>
                <div className="font-display font-bold">{product.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{product.description}</div>
              </div>
              <div className="font-display font-black text-2xl text-brand-sky">{product.price}₽</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nick" className="font-mono text-xs uppercase">Ник в игре</Label>
              <Input
                id="nick"
                placeholder="Steve123"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                maxLength={16}
                className="bg-background border-border font-mono"
                autoFocus
              />
              <div className="text-xs text-muted-foreground">Точно как пишете в клиенте Minecraft</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-mono text-xs uppercase">Email (необязательно)</Label>
              <Input
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="bg-background border-border"
              />
              <div className="text-xs text-muted-foreground">Для чека и поддержки</div>
            </div>

            <div className="p-3 rounded-xl bg-brand-sky/5 border border-brand-sky/20 flex gap-3 text-xs text-muted-foreground">
              <Icon name="Info" size={16} className="text-brand-sky flex-shrink-0 mt-0.5" />
              <span>Оплата через ЮMoney. Нажимая «Оплатить», вы соглашаетесь с офертой.</span>
            </div>

            <Button
              onClick={submit}
              disabled={loading}
              className="w-full h-12 bg-brand-sky text-background hover:bg-brand-sky/90 font-display font-bold"
            >
              {loading ? (
                <><Icon name="Loader2" size={16} className="mr-2 animate-spin" /> Создаём заказ...</>
              ) : (
                <><Icon name="CreditCard" size={16} className="mr-2" /> Оплатить {product.price}₽</>
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BuyDialog;
