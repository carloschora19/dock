# Guía de Configuración de Supabase

## Paso 1: Crear Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Haz clic en "New Project"
4. Completa los datos:
   - **Name**: Elige un nombre para tu proyecto (ej: "dock-app")
   - **Database Password**: Crea una contraseña segura (guárdala, la necesitarás)
   - **Region**: Selecciona la región más cercana a tus usuarios
5. Haz clic en "Create new project" y espera unos minutos

## Paso 2: Obtener Credenciales

1. Una vez creado el proyecto, ve a **Settings** (⚙️) en el menú lateral
2. Haz clic en **API** en el submenú
3. Copia los siguientes valores:
   - **Project URL** (algo como: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public** key (en la sección "Project API keys")

## Paso 3: Configurar tu Aplicación

1. Abre el archivo `supabase-config.js`
2. Reemplaza los valores de ejemplo con tus credenciales:

```javascript
const SUPABASE_URL = 'https://TU_PROYECTO.supabase.co';
const SUPABASE_ANON_KEY = 'TU_ANON_KEY_AQUI';
```

**IMPORTANTE**: Estos valores deben coincidir exactamente con los de tu proyecto en Supabase.

## Paso 4: Configurar Email Authentication

1. Ve a **Authentication** en el menú lateral de Supabase
2. Haz clic en **Providers**
3. Asegúrate de que **Email** esté habilitado (debe estar activado por defecto)
4. (Opcional) Configura las URL de redirección en **URL Configuration**:
   - Site URL: `http://localhost:8000` (para desarrollo local)
   - Redirect URLs: Agrega las URLs de tu aplicación en producción

## Paso 5: Configurar Email Templates (Opcional pero Recomendado)

1. Ve a **Authentication** > **Email Templates**
2. Personaliza los templates de:
   - **Confirm signup**: Email de confirmación de cuenta
   - **Magic Link**: Link mágico para inicio de sesión
   - **Change Email Address**: Cambio de email
   - **Reset Password**: Recuperación de contraseña

## Paso 6: Probar la Aplicación

1. Inicia un servidor HTTP local. Por ejemplo:
   ```bash
   # Con Python 3
   python -m http.server 8000

   # O con Node.js (si tienes http-server instalado)
   npx http-server -p 8000
   ```

2. Abre tu navegador en `http://localhost:8000/login.html`

3. **Crear una cuenta**:
   - Ingresa un email válido
   - Crea una contraseña (mínimo 6 caracteres)
   - Haz clic en "Sign up"
   - Revisa tu email para confirmar la cuenta (si está habilitada la confirmación)

4. **Iniciar sesión**:
   - Ingresa tu email y contraseña
   - Haz clic en "Sign in"
   - Deberías ser redirigido a `index.html`

## Paso 7: Desactivar Confirmación de Email (Solo para Desarrollo)

Si quieres probar sin confirmar el email:

1. Ve a **Authentication** > **Providers** en Supabase
2. Haz clic en **Email**
3. Desactiva "Confirm email"
4. Guarda los cambios

**IMPORTANTE**: En producción, mantén la confirmación de email activada por seguridad.

## Funcionalidades Implementadas

✅ **Registro de usuarios** (Sign up)
✅ **Inicio de sesión** (Sign in)
✅ **Cierre de sesión** (Logout)
✅ **Protección de rutas** (solo usuarios autenticados pueden acceder a index.html)
✅ **Persistencia de sesión** (la sesión se mantiene al recargar la página)
✅ **Manejo de errores** (mensajes de error claros)
✅ **Animaciones** (experiencia visual agradable)

## Próximos Pasos (Opcional)

### 1. Guardar Datos de Usuario en Supabase

Puedes crear una tabla `profiles` para guardar información adicional:

```sql
-- En el SQL Editor de Supabase
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone
);

-- Enable Row Level Security
alter table profiles enable row level security;

-- Create policy para que los usuarios solo vean su perfil
create policy "Users can view their own profile"
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can update their own profile"
  on profiles for update
  using ( auth.uid() = id );
```

### 2. Recuperación de Contraseña

Puedes agregar un botón "Forgot password?" en login.html:

```javascript
async function resetPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:8000/reset-password.html',
  });

  if (error) {
    console.error('Error:', error);
  } else {
    alert('Revisa tu email para restablecer tu contraseña');
  }
}
```

### 3. Guardar Bookmarks y Personal en Supabase

En lugar de usar localStorage, puedes guardar los datos en Supabase:

```sql
-- Tabla para bookmarks
create table bookmarks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade,
  name text not null,
  url text not null,
  created_at timestamp with time zone default now()
);

-- Tabla para distribución de personal
create table personnel (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade,
  name text not null,
  zone text not null,
  subzone text not null,
  created_at timestamp with time zone default now()
);
```

## Solución de Problemas

### Error: "Invalid API key"
- Verifica que hayas copiado correctamente la anon key de Supabase
- Asegúrate de no tener espacios al inicio o final

### Error: "Failed to fetch"
- Verifica que la URL del proyecto esté correcta
- Asegúrate de tener conexión a internet
- Revisa la consola del navegador para más detalles

### El email de confirmación no llega
- Revisa la carpeta de spam
- Verifica que el email esté escrito correctamente
- En desarrollo, puedes desactivar la confirmación de email

### La sesión no persiste
- Asegúrate de que las cookies estén habilitadas en tu navegador
- Verifica que estés usando HTTPS en producción

## Recursos Adicionales

- [Documentación de Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Ejemplos de Auth](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui)

## Contacto y Soporte

Si tienes problemas con la configuración, revisa:
1. La consola del navegador (F12) para ver errores
2. Los logs de Supabase en **Logs** > **Auth Logs**
3. La documentación oficial de Supabase
