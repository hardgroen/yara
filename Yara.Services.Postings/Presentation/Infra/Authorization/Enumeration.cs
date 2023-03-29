using System.Reflection;

namespace Yara.Services.Postings.Presentation.Infra.Authorization;

public abstract class Enumeration : IComparable
{
    public string Key { get; private set; }

    protected Enumeration(string key) => (Key) = (key);

    public override string ToString() => Key;

    public static IEnumerable<T> GetAll<T>() where T : Enumeration
    {
        return typeof(T).GetFields(BindingFlags.Public |
                            BindingFlags.Static |
                            BindingFlags.DeclaredOnly
                            )
                 .Where(f => f.FieldType != typeof(string))
                 .Select(f => f.GetValue(null))
                 .Cast<T>();
    }
        

    public override bool Equals(object obj)
    {
        if (obj is not Enumeration otherValue)
        {
            return false;
        }

        var typeMatches = GetType().Equals(obj.GetType());
        var valueMatches = Key.Equals(otherValue.Key);

        return typeMatches && valueMatches;
    }

    public int CompareTo(object other) => Key.CompareTo(((Enumeration)other).Key);

    public override int GetHashCode() => Key.GetHashCode();

    public static T FromValue<T>(string value) where T : Enumeration
    {
        var matchingItem = Parse<T, string>(value, "value", item => item.Key == value);
        return matchingItem;
    }

    public static T FromDisplayName<T>(string displayName) where T : Enumeration
    {
        var matchingItem = Parse<T, string>(displayName, "display name", item => item.Key == displayName);
        return matchingItem;
    }

    private static T Parse<T, K>(K value, string description, Func<T, bool> predicate) where T : Enumeration
    {
        var matchingItem = GetAll<T>().FirstOrDefault(predicate);

        if (matchingItem == null)
            throw new InvalidOperationException($"'{value}' is not a valid {description} in {typeof(T)}");

        return matchingItem;
    }
}