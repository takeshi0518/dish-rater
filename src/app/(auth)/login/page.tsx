import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div>
      <div>
        <h1>Login</h1>
        <div>
          <form>
            <div>
              <Label>メールアドレス</Label>
              <Input />
            </div>
            <div>
              <Label>パスワード</Label>
              <Input />
            </div>
            <Button type="submit">送信</Button>
          </form>

          <div>または</div>

          <div>
            <Button variant="outline">Github</Button>
            <Button variant="outline">Google</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
