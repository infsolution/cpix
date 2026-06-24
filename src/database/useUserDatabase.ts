import { UserCreate } from "@/app/Type/types";
import {
  FormEditProfileParams,
  IUser,
} from "@/shared/interfaces/user-interface";
import { useSQLiteContext } from "expo-sqlite";
export function useUserDatabase() {
  const database = useSQLiteContext();

  async function create(data: UserCreate): Promise<IUser | null> {
    const statement = await database.prepareAsync(
      `INSERT INTO users (name, user_name, email, universal_uuid, is_public) VALUES ($name, $user_name, $email, $universal_uuid, $is_public)`,
    );
    const { lastInsertRowId } = await statement.executeAsync({
      $name: data.name,
      $user_name: data.user_name,
      $email: data.email,
      $universal_uuid: data.universal_uuid,
      $is_public: data.termChecked,
    });
    return getUserById(lastInsertRowId.toString()) as Promise<IUser | null>;
  }
  function login(data: { email: string; password: string }) {
    const response = database.getFirstAsync<IUser>(
      `SELECT * FROM users WHERE email = ? AND password = ?`,
      {
        $email: data.email,
        $password: data.password,
      },
    );
    return response;
  }

  async function getUserById(id: string): Promise<IUser | null> {
    const response = await database.getFirstAsync<IUser>(
      `SELECT * FROM users WHERE id = ?`,
      [id],
    );
    return response;
  }

  async function getUserByUuid(uuid: string): Promise<IUser | null> {
    const response = await database.getFirstAsync<IUser>(
      `SELECT * FROM users WHERE universal_uuid = ?`,
      [uuid],
    );
    return response;
  }

  async function updateUser(userData: FormEditProfileParams) {
    const statement = await database.prepareAsync(`
            UPDATE users SET name=$name, 
            user_name=$user_name,
            email=$email,
            is_public=$is_public,
            updated_at = CURRENT_TIMESTAMP 
            WHERE id = $id`);
    statement.executeAsync({
      $id: userData.id,
      $name: userData.name,
      $user_name: userData.userName,
      $email: userData.email,
      $is_public: userData.termChecked,
    });
  }

  return {
    create,
    login,
    getUserByUuid,
    updateUser,
  };
}
